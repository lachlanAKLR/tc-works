import { PortableText } from "next-sanity";
import { PROJECT_QUERYResult } from "../../../sanity.types";
import { PortableTextComponents } from "./PortableTextComponents";

export default function ProjectContent({ project }: { project: PROJECT_QUERYResult }) {
  const services = project?.services ?? [];
  const collaborators = project?.collaborators ?? [];

  return (
    <div className="w-[62.5%] h-screen p-6 bg-white shrink-0">
      <h1>
        {project?.title}
        {project?.subheading ? `, ${project?.subheading}` : ""}
      </h1>
      <PortableText value={project?.info} components={PortableTextComponents} />
      <div className="text-courier-base pt-12">
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
            <h2 className="uppercase">Collaborators</h2>
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
          <div className="pb-4">
            <h2 className="uppercase">Year</h2>
            <p>{project.year}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
