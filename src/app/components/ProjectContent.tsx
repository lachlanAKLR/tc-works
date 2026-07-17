import { PortableText } from "next-sanity";
import { PROJECT_QUERYResult } from "../../../sanity.types";
import { getPortableTextComponents } from "./PortableTextComponents";
import ProjectInfo from "./ProjectInfo";

export default function ProjectContent({ project }: { project: PROJECT_QUERYResult }) {
  const services = project?.services ?? [];
  const collaborators = project?.collaborators ?? [];

  return (
    <>
      <h1 className="text-monument-base fixed left-35 top-2.25 z-70">
        {project?.title}
        {project?.subheading ? `, ${project?.subheading}` : ""}
      </h1>

      <div className="fixed z-60 w-full md:w-[calc(33.3333%-8px)] min-w-100 h-auto md:h-screen p-5 md:p-3 bg-white shrink-0 flex flex-col justify-between">
        <ProjectInfo info={project?.info} />
        <div className="hidden md:block pt-20">
          <PortableText value={project?.info} components={getPortableTextComponents()} />
        </div>
        <div className="pt-12">
          {services.length > 0 && (
            <div className="pb-1 grid grid-cols-4 gap-x-3">
              <h2 className="uppercase col-span-1">Services</h2>
              <ul className="col-span-3">
                {services.map((service, index) => (
                  <li key={index} className="inline whitespace-normal">
                    {`${service.title}${index < services.length - 1 ? ", " : ""}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {collaborators.length > 0 && (
            <div className="pb-1 grid grid-cols-4 gap-x-3">
              <h2 className="uppercase col-span-1">
                {project?.collaboratorsLabel ?? "Collaborators"}
              </h2>
              <ul className="col-span-3">
                {collaborators.map((collaborator, index) => (
                  <li
                    key={index}
                    className="inline whitespace-normal"
                  >{`${collaborator.title}${index < collaborators.length - 1 ? ", " : ""}`}</li>
                ))}
              </ul>
            </div>
          )}
          {project?.year ? (
            <div className="grid grid-cols-4 gap-x-3">
              <h2 className="uppercase">Year</h2>
              <p>{project.year}</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
