import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import Link from "next/link";
import { sanityImage } from "@/sanity/lib/image";

export default function ProjectRelated({ projects }: { projects: PROJECTS_QUERYResult }) {
  return (
    <>
      {/* Mobile-only heading */}
      <div className="block md:hidden">
        <h2 className="text-monument-base text-center w-full py-20">More Projects</h2>
      </div>
      <div className="h-auto md:h-full flex flex-row md:flex-col shrink-0 overflow-x-scroll md:overflow-x-visible">
        {projects.slice(0, 5).map((project) => (
          <div className="w-[45vw] md:w-auto md:h-1/5 shrink-0 aspect-square" key={project._id}>
            <Link href={`/project/${project.slug?.current}`} className="block h-full">
              {project?.mainImage?.asset && (
                <Image
                  {...sanityImage(project.mainImage.asset, 2000)}
                  alt={project?.mainImage?.alt ?? ""}
                  className="h-full w-full object-cover transition-all ease duration-200"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
