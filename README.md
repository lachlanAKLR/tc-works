# TC Works

Portfolio site for Tom Clayton. Built with Next.js 15, React 19, Tailwind CSS v4 and Sanity (the CMS, which is embedded in the site at `/studio`). Videos are hosted on Cloudflare Stream.

## Getting set up

You'll need [Node.js](https://nodejs.org) 20 or newer and git.

```bash
git clone git@github.com:lachlanAKLR/tc-works.git
cd tc-works
npm install
```

Create a file called `.env.local` in the project root containing the three values Lachlan sends you:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_READ_TOKEN=...
```

This file is gitignored. Never commit it.

Then start the dev server:

```bash
npm run dev
```

Open http://localhost:3000. Pages reload as you save.

## Content vs. code

All text, images and videos come from Sanity. Your local site reads the **live** dataset, so:

- Front-end changes (layout, type, spacing, animation) live in the code and only reach the live site once they're merged.
- Content edits made in the Studio (http://localhost:3000/studio or the live `/studio`) are published **immediately** to the real site, even when you're running the site locally.

## Where things live

| What | Where |
| --- | --- |
| Pages | `src/app/page.tsx` (home), `src/app/overview/`, `src/app/about/`, `src/app/project/[slug]/` |
| Components (nav, footer, tiles, project page parts) | `src/app/components/` |
| Colours, fonts, type sizes, grid | `src/app/globals.css` |
| Font files and loading | `src/app/fonts/`, `src/app/utils/customFonts.tsx` |
| Horizontal scroll on project pages | `src/app/utils/horizontalScroll.tsx` |
| CMS fields (schemas) | `src/sanity/schemaTypes/` |
| CMS queries | `src/sanity/lib/queries.ts` |

### Styling

Tailwind v4 is configured in CSS, not in a `tailwind.config.js`. Everything is in `src/app/globals.css`:

- **Colours**: `--background` / `--foreground` at the top, used as `bg-background` and `text-foreground`.
- **Type**: each style bundles font, size and line height into one class: `text-monument-base`, `text-garnier-base`, `text-garnier-sm`, `text-courier-base`, `text-courier-sm`, plus `md:` versions. To adjust a style everywhere it's used, change the matching `--font-size-*` and `--line-height-*` values in `@theme`.
- **Grid**: a 16-column layout via `.site-grid` (and the 12-column `.site-grid-main`), with `gap-gutter` for the column gap.

## Making changes

Work on a branch, then open a pull request so Lachlan can review and merge:

```bash
git checkout -b tom/short-description
# ...make your edits...
git add .
git commit -m "Describe what changed"
git push -u origin tom/short-description
```

GitHub will show a link to open the pull request. Please don't push directly to `main`, because that's what the live site deploys from.

Before you push, it's worth running:

```bash
npm run lint
npm run build
```

If `build` passes locally, the deploy will too.

## Changing CMS fields

You won't need this for front-end tweaks. If you add or change a field in a schema or a query, regenerate the TypeScript types:

```bash
npx sanity schema extract
npx sanity typegen generate
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build (catches type errors) |
| `npm run lint` | Check for code issues |
