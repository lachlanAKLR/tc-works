import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import CloudflareStream from "./CloudflareStream";

const builder = createImageUrlBuilder({ projectId, dataset });

function ProjectLine({ project }: { project: PROJECTS_QUERYResult[number] }) {
  const services = project?.services ?? [];
  const noCase = project.imageCount === null;

  const dims = project?.hoverVideo?.poster?.asset?.metadata?.dimensions;
  const posterUrl = project?.hoverVideo?.poster?.asset?.url ?? undefined;

  return (
    <>
      <div className="col-span-1 w-full flex justify-between">
        <p>{project.year}</p>
        <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {noCase ? (
            <Image
              src="/eye.svg"
              alt="eye icon"
              width={8}
              height={8}
              className="h-3 w-auto relative top-0.75"
            />
          ) : (
            <div className="w-3 h-3 rounded-full bg-black relative top-0.75"></div>
          )}
        </div>
      </div>

      <p className="col-span-5">
        {project?.title}
        {project?.subheading ? `, ${project?.subheading}` : ""}
      </p>

      {services.length > 0 && (
        <ul className="col-span-6 flex gap-1">
          {services.map((service, index) => (
            <li key={index} className="inline whitespace-normal">
              {`${service.title}${index < services.length - 1 ? ", " : ""}`}
            </li>
          ))}
        </ul>
      )}

      {(project?.hoverVideo?.cloudId || project?.hoverImage?.asset) && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="w-[25vw] max-w-150">
            {project?.hoverVideo?.cloudId ? (
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
                  .width(4000)
                  .quality(100)
                  .fit("max")
                  .auto("format")
                  .url()}
                width={project?.hoverImage?.asset?.metadata?.dimensions?.width ?? undefined}
                height={project?.hoverImage?.asset?.metadata?.dimensions?.height ?? undefined}
                alt={project?.hoverImage?.alt ?? ""}
                className="w-full object-cover"
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProjectsTiles({ projects }: { projects: PROJECTS_QUERYResult }) {
  return (
    <section>
      <div className="pt-21 px-3 flex flex-col gap-3 [&:has(>*:hover)>*:not(:hover)]:opacity-25 min-h-screen">
        {projects.map((project) => {
          const noCase = project.imageCount === null;
          const className = "site-grid-main group transition-opacity duration-200";

          return noCase ? (
            <div key={project._id} className={className}>
              <ProjectLine project={project} />
            </div>
          ) : (
            <Link
              key={project._id}
              href={`/project/${project.slug?.current}`}
              className={className}
            >
              <ProjectLine project={project} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
