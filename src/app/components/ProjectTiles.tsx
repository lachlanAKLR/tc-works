import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { colSpanMap, colStartMap } from "@/app/utils/colSpanMap";
import Link from "next/link";

const builder = createImageUrlBuilder({ projectId, dataset });

export default function ProjectsTiles({ projects }: { projects: PROJECTS_QUERYResult }) {
  return (
    <div className="site-grid">
      {projects.map((project) => (
        <div
          className={`relative isolate pb-13.25 -mb-13.25 
  ${colSpanMap[project.homeImageWidth ?? 16] ?? "col-span-16"}
  ${project.alignRight ? (colStartMap[project.homeImageWidth ?? 16] ?? "") : ""}
`}
          key={project._id}
        >
          <Link href={`/project/${project.slug?.current}`} className="block">
            <div className="sticky top-0 z-10 h-0 ">
              <h2 className="px-6 pt-13.25 text-white">
                {project.title}
                {project.subheading ? `, ${project.subheading}` : ""}
              </h2>
            </div>
            {project?.mainImage?.asset && (
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
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
