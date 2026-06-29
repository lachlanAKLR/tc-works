// ProjectsTiles.tsx
import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { colSpanMap, colStartMap } from "@/app/utils/colSpanMap";
import Link from "next/link";
import CloudflareStream from "./CloudflareStream";

const builder = createImageUrlBuilder({ projectId, dataset });

function ProjectTile({ project }: { project: PROJECTS_QUERYResult[number] }) {
  const dims = project?.mainVideo?.poster?.asset?.metadata?.dimensions;
  const posterUrl = project?.mainVideo?.poster?.asset?.url ?? undefined;

  return (
    <Link href={`/project/${project.slug?.current}`} className="block">
      <div className="sticky top-0 z-10 h-0">
        <h2 className="px-5 md:px-6 pt-12 md:pt-13.25 text-white md:text-garnier-base text-garnier-sm">
          {project.title}
          {project.subheading ? `, ${project.subheading}` : ""}
        </h2>
      </div>
      {project?.mainVideo?.cloudId ? (
        <div
          className="pointer-events-none"
          style={{ aspectRatio: dims ? `${dims.width}/${dims.height}` : "16/9" }}
        >
          <CloudflareStream
            src={project.mainVideo.cloudId}
            poster={posterUrl}
            className="h-full w-full object-cover"
          />
        </div>
      ) : project?.mainImage?.asset ? (
        <Image
          src={builder
            .image(project.mainImage.asset as SanityImageSource)
            .width(2000)
            .fit("max")
            .auto("format")
            .url()}
          width={project?.mainImage?.asset?.metadata?.dimensions?.width ?? undefined}
          height={project?.mainImage?.asset?.metadata?.dimensions?.height ?? undefined}
          alt={project?.mainImage?.alt ?? ""}
          className="h-auto w-full"
        />
      ) : null}
    </Link>
  );
}

export default function ProjectsTiles({ projects }: { projects: PROJECTS_QUERYResult }) {
  return (
    <div>
      <div className="md:hidden flex flex-col">
        {projects.map((project) => (
          <div
            key={project._id}
            className="relative isolate pb-13.25 -mb-13.25 last:pb-0 last:mb-0"
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>

      <div className="hidden md:grid site-grid">
        {projects.map((project) => (
          <div
            key={project._id}
            className={`relative isolate pb-13.25 -mb-13.25 last:pb-0 last:mb-0
        ${colSpanMap[project.homeImageWidth ?? 16] ?? "col-span-16"}
        ${project.alignRight ? (colStartMap[project.homeImageWidth ?? 16] ?? "") : ""}
      `}
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
