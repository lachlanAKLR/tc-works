"use client";

import { useState } from "react";
import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import CloudflareStream from "./CloudflareStream";

const builder = createImageUrlBuilder({ projectId, dataset });

function ProjectLine({
  project,
  open,
  onToggle,
}: {
  project: PROJECTS_QUERYResult[number];
  open: boolean;
  onToggle: () => void;
}) {
  const services = project?.services ?? [];
  const noCase = project.imageCount === null;

  const dims = project?.hoverVideo?.poster?.asset?.metadata?.dimensions;
  const posterUrl = project?.hoverVideo?.poster?.asset?.url ?? undefined;

  // Hover/dropdown media — Cloudflare video if present, else hover image, else null.
  // Rendered in two places: desktop hover overlay + mobile dropdown.
  const media = project?.hoverVideo?.cloudId ? (
    <div
      className="aspect-3/4 md:aspect-auto"
      style={{ aspectRatio: dims ? `${dims.width}/${dims.height}` : undefined }}
    >
      <CloudflareStream
        src={project.hoverVideo.cloudId}
        poster={posterUrl}
        className="h-full w-full object-cover"
      />
    </div>
  ) : project?.hoverImage?.asset ? (
    <Image
      src={builder
        .image(project.hoverImage.asset as SanityImageSource)
        .width(2000)
        .quality(75)
        .fit("max")
        .auto("format")
        .url()}
      width={project?.hoverImage?.asset?.metadata?.dimensions?.width ?? undefined}
      height={project?.hoverImage?.asset?.metadata?.dimensions?.height ?? undefined}
      alt={project?.hoverImage?.alt ?? ""}
      className="w-full object-cover"
    />
  ) : null;

  // Status icon — eye for noCase projects, filled dot for case studies
  const icon = noCase ? (
    <Image
      src="/eye.svg"
      alt="eye icon"
      width={8}
      height={8}
      className="h-3 w-auto relative top-0.75"
    />
  ) : (
    <div className="mx-0.5 w-3 h-3 rounded-full bg-black relative top-0.75"></div>
  );

  return (
    <>
      {/* Year + hover-revealed icon (desktop, col 1) */}
      <div className="hidden md:flex col-span-1 w-full justify-between">
        <p>{project.year}</p>
        <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {icon}
        </div>
      </div>

      {/* Title row — desktop: plain text; mobile: title + always-visible icon.
          For noCase rows with media, the mobile title is a button that toggles the dropdown. */}
      <div className="col-span-12 md:col-span-5 flex justify-between md:block">
        {noCase && media ? (
          <button type="button" className="text-left md:hidden" onClick={onToggle}>
            {project?.title}
            {project?.subheading ? `, ${project?.subheading}` : ""}
          </button>
        ) : null}
        <p className={noCase && media ? "hidden md:block" : ""}>
          {project?.title}
          {project?.subheading ? `, ${project?.subheading}` : ""}
        </p>
        <div className="md:hidden">{icon}</div>
      </div>

      {/* Mobile dropdown — full-width media revealed under the row when the title is tapped */}
      {noCase && media && open && <div className="md:hidden col-span-12 w-full pt-2">{media}</div>}

      {/* Service tags (desktop only) — each tag wraps as a whole unit, never mid-phrase */}
      {services.length > 0 && (
        <ul className="hidden md:flex md:flex-wrap col-span-6">
          {services.map((service, index) => (
            <li key={index} className="whitespace-nowrap">
              {`${service.title}${index < services.length - 1 ? ", " : ""}`}
            </li>
          ))}
        </ul>
      )}

      {/* Desktop hover overlay — centered, fixed, fades in on row hover */}
      {media && (
        <div className="pointer-events-none fixed inset-0 z-50 hidden md:flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="w-[25vw] max-w-150">{media}</div>
        </div>
      )}
    </>
  );
}

export default function ProjectsTiles({ projects }: { projects: PROJECTS_QUERYResult }) {
  // Id of the single mobile dropdown currently open (only one at a time)
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section>
      {/* Row spacing is per-row padding, not a flex gap, so adjacent rows meet with no
          dead zone — keeps the hover state from flashing as the cursor moves between lines. */}
      <div className="pt-[calc(var(--spacing)*21-6px)] px-3 flex flex-col [&:has(>*:hover)>*:not(:hover)]:opacity-25 min-h-screen">
        {projects.map((project) => {
          const noCase = project.imageCount === null;
          const className = "site-grid-main group py-1.5 transition-opacity duration-200";
          const lineProps = {
            project,
            open: openId === project._id,
            onToggle: () => setOpenId((id) => (id === project._id ? null : project._id)),
          };

          return noCase ? (
            <div key={project._id} className={className}>
              <ProjectLine {...lineProps} />
            </div>
          ) : (
            <Link
              key={project._id}
              href={`/project/${project.slug?.current}`}
              className={className}
            >
              <ProjectLine {...lineProps} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
