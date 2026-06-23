import { PROJECT_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import Image from "next/image";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({ projectId, dataset });

export default function ProjectImages({ project }: { project: PROJECT_QUERYResult }) {
  return (
    <div className="h-full shrink-0 flex flex-row">
      {project?.projectImages?.map((image, index) => {
        if (image.type !== "imageObject" || !image.asset) return null;
        return (
          <div key={index} className="h-full shrink-0">
            <Image
              src={builder
                .image(image.asset as SanityImageSource)
                .width(2000)
                .fit("max")
                .auto("format")
                .url()}
              width={image.asset.metadata?.dimensions?.width ?? undefined}
              height={image.asset.metadata?.dimensions?.height ?? undefined}
              alt={image.alt ?? ""}
              className="h-full w-auto"
            />
          </div>
        );
      })}
    </div>
  );
}
