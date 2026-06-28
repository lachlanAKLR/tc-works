// ProjectImages.tsx
import { PROJECT_QUERYResult } from "../../../sanity.types";
import { dataset, projectId } from "@/sanity/env";
import Image from "next/image";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import CloudflareStream from "@/app/components/CloudflareStream";

const builder = createImageUrlBuilder({ projectId, dataset });

export default function ProjectImages({ project }: { project: PROJECT_QUERYResult }) {
  return (
    <div className="flex flex-col md:flex-row md:h-full md:shrink-0">
      {project?.mainVideo?.cloudId ? (
        (() => {
          const dims = project.mainVideo.poster?.asset?.metadata?.dimensions;
          const posterUrl = project.mainVideo.poster?.asset?.url ?? undefined;
          return (
            <div
              className="md:h-full md:shrink-0 relative pointer-events-none"
              style={{ aspectRatio: dims ? `${dims.width}/${dims.height}` : "16/9" }}
            >
              <CloudflareStream
                src={project.mainVideo.cloudId}
                poster={posterUrl}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        })()
      ) : project?.mainImage?.asset ? (
        <div className="md:h-full md:shrink-0">
          <Image
            src={builder
              .image(project.mainImage.asset as SanityImageSource)
              .width(2000)
              .fit("max")
              .auto("format")
              .url()}
            width={project.mainImage.asset.metadata?.dimensions?.width ?? undefined}
            height={project.mainImage.asset.metadata?.dimensions?.height ?? undefined}
            alt={project.mainImage.alt ?? ""}
            className="w-full md:w-auto md:h-full"
          />
        </div>
      ) : null}

      {project?.projectImages?.map((image, index) => {
        if (image.type === "imageObject" && image.asset) {
          return (
            <div key={index} className="md:h-full md:shrink-0">
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
                className="w-full md:w-auto md:h-full"
              />
            </div>
          );
        }
        if (image.type === "videoObject" && image.cloudId) {
          const dims = image.poster?.asset?.metadata?.dimensions;
          const posterUrl = image.poster?.asset?.url ?? undefined;
          return (
            <div
              key={index}
              className="md:h-full md:shrink-0 relative pointer-events-none"
              style={{ aspectRatio: dims ? `${dims.width}/${dims.height}` : "16/9" }}
            >
              <CloudflareStream
                src={image.cloudId}
                poster={posterUrl}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
