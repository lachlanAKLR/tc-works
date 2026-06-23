import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import Link from "next/link";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({ projectId, dataset });

export default function ProjectRelated({ projects }: { projects: PROJECTS_QUERYResult }) {
  return (
    <div className="h-full flex flex-col shrink-0">
      {projects.slice(0, 5).map((project) => (
        <div className="h-1/5 shrink-0 aspect-square" key={project._id}>
          <Link href={`/project/${project.slug?.current}`} className="block h-full">
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
                className="h-full w-full object-cover opacity-30 hover:opacity-100 transition-all ease duration-200"
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
