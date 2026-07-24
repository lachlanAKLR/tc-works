# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Portfolio site for Tom Clayton (design & creative direction). Next.js 15 (App Router, Turbopack) + React 19 + TypeScript, styled with Tailwind CSS v4, content managed in Sanity v4 with the Studio embedded at `/studio`. Videos are hosted on Cloudflare Stream. No test suite — verify changes by running the dev server.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint
- Regenerate Sanity types after changing schemas or queries:
  `npx sanity schema extract` (writes `schema.json`) then `npx sanity typegen generate` (writes `sanity.types.ts`)
- One-off Sanity scripts: `npx sanity exec scripts/<file>.ts --with-user-token` (see `scripts/seed-placeholder-projects.ts`)

Requires `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_READ_TOKEN` in the environment (`src/sanity/env.ts` throws if the public ones are missing).

## Architecture

### Sanity content flow

- **Schemas** live in `src/sanity/schemaTypes/` (registered in `index.ts`; reusable objects like `imageObject`/`videoObject` under `objects/`). Document types: `information` (singleton for the about/footer content), `project`, `serviceTag`, `collaboratorTag`.
- **Queries** are all defined with `defineQuery` in `src/sanity/lib/queries.ts` (`INFORMATION_QUERY`, `PROJECTS_QUERY`, `PROJECT_QUERY`). Queries expand image assets inline (`asset->{ _id, url, metadata { dimensions } }`) rather than resolving URLs client-side only.
- **Typegen is the typing source of truth**: components import generated result types from the root `sanity.types.ts` (e.g. `PROJECTS_QUERYResult`, `PROJECT_QUERYResult[number]`). Never hand-write interfaces for query results — add fields to the query/schema, re-run typegen, and import the generated type.
- **Fetching**: server pages call `sanityFetch` from `src/sanity/lib/live.ts` (`defineLive`, powers live preview); `generateStaticParams` uses the plain `client` from `src/sanity/lib/client.ts`. Data is fetched in server pages and passed as props to components.
- **Draft mode / visual editing**: enabled via `/api/draft-mode/enable` (wired to the Studio's presentation tool), rendered through `<SanityLive />` + `<VisualEditing />` in `src/app/layout.tsx`. The client has stega enabled pointing at `http://localhost:3000`.
- **Project ordering** uses `@sanity/orderable-document-list` (`orderRank` field on `project`, `orderableDocumentListDeskItem` in `src/sanity/structure.ts`); `PROJECTS_QUERY` orders by `orderRank`.

### Frontend

- Routes: `/` (project tiles), `/overview`, `/about`, `/project/[slug]` (horizontal-scrolling detail page), `/studio/[[...tool]]`. Route `params` are a `Promise` and must be awaited (Next 15).
- Pages are server components; interactive components (`ProjectTiles`, `Nav`, `CloudflareStream`, `horizontalScroll`, etc.) are `"use client"`. Components live flat in `src/app/components/`, shared helpers in `src/app/utils/`, hooks in `src/app/hooks/`.
- **Video**: the `videoObject` schema stores a Cloudflare Stream ID + poster image; render with the `CloudflareStream` component (`@cloudflare/stream-react`), which fades the poster out once the video is ready.
- **Images**: built with `createImageUrlBuilder` from `@sanity/image-url` using dimensions from query metadata for aspect ratios.

### Styling (Tailwind v4 — CSS-first config)

There is no `tailwind.config.js`; all theme config is in `@theme` in `src/app/globals.css`. The design system defined there:

- Typography utilities like `.text-monument-base`, `.text-garnier-base`, `.text-courier-sm` bundle font-family + size + line-height as custom `@layer utilities` classes (with `@variant md` responsive versions). Use these instead of ad-hoc font/size classes.
- Local fonts are loaded via `next/font/local` in `src/app/utils/customFonts.tsx` and exposed as CSS variables on `<body>`.
- Layout uses a 16-column grid (`--grid-template-columns-16`, extended col-span/start values, `--spacing-gutter`); `src/app/utils/colSpanMap.tsx` maps Sanity image span/start fields to grid classes.
