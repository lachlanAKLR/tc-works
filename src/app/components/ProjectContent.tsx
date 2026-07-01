import { PortableText } from "next-sanity";
import { PROJECT_QUERYResult } from "../../../sanity.types";
import { getPortableTextComponents } from "./PortableTextComponents";
import ProjectInfo from "./ProjectInfo";

export default function ProjectContent({ project }: { project: PROJECT_QUERYResult }) {
  const services = project?.services ?? [];
  const collaborators = project?.collaborators ?? [];

  return (
    <div className="w-full md:w-[62.5%] h-auto md:h-screen p-5 md:p-6 bg-white shrink-0">
      <h1 className="md:text-garnier-base text-garnier-sm">
        {project?.title}
        {project?.subheading ? `, ${project?.subheading}` : ""}
      </h1>
      <ProjectInfo info={project?.info} />
      <div className="hidden md:block">
        <PortableText value={project?.info} components={getPortableTextComponents()} />
      </div>
      <div className="text-courier-sm md:text-courier-base pt-12">
        {services.length > 0 && (
          <div className="pb-4">
            <h2 className="uppercase">Services</h2>
            <ul className="flex gap-1">
              {services.map((service, index) => (
                <li key={index}>{`${service.title}${index < services.length - 1 ? ", " : ""}`}</li>
              ))}
            </ul>
          </div>
        )}
        {collaborators.length > 0 && (
          <div className="pb-4">
            <h2 className="uppercase">{project?.collaboratorsLabel ?? "Collaborators"}</h2>
            <ul className="flex gap-1">
              {collaborators.map((collaborator, index) => (
                <li
                  key={index}
                >{`${collaborator.title}${index < collaborators.length - 1 ? ", " : ""}`}</li>
              ))}
            </ul>
          </div>
        )}
        {project?.year ? (
          <div className="pb-0 md:pb-4">
            <h2 className="uppercase">Year</h2>
            <p>{project.year}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
