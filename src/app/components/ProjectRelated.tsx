import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import Link from "next/link";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({ projectId, dataset });

export default function ProjectRelated({ projects }: { projects: PROJECTS_QUERYResult }) {
  return (
    <>
      <div className="block md:hidden">
        <h2 className="text-garnier-sm text-center w-full py-20 ">More Projects</h2>
      </div>
      <div className="h-auto md:h-full flex flex-row md:flex-col shrink-0 overflow-x-scroll md:overflow-x-visible">
        {projects.slice(0, 5).map((project) => (
          <div className="w-[45vw] md:w-auto md:h-1/5 shrink-0 aspect-square" key={project._id}>
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
                  className="h-full w-full object-cover opcaity-100 md:opacity-30 hover:opacity-100 transition-all ease duration-200"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
