// ProjectImages.tsx
import { PROJECT_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { sanityImage } from "@/sanity/lib/image";
import CloudflareStream from "@/app/components/CloudflareStream";

export default function ProjectImages({ project }: { project: PROJECT_QUERYResult }) {
  return (
    <div className="flex flex-col md:flex-row md:h-full md:shrink-0 z-60">
      <div className="w-[calc(33.3333vw-8px)] min-w-100" aria-hidden></div>
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
                posterWidth={dims?.width}
                posterHeight={dims?.height}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        })()
      ) : project?.mainImage?.asset ? (
        <div className="md:h-full md:shrink-0">
          <Image
            {...sanityImage(project.mainImage.asset, 2000)}
            alt={project.mainImage.alt ?? ""}
            className="w-full md:w-auto md:h-full"
          />
        </div>
      ) : null}

      {project?.projectImages?.map((image, index) => {
        if (image.type === "imageObject" && image.asset) {
          return (
            <div key={index} className="md:h-full md:shrink-0 relative">
              <Image
                {...sanityImage(image.asset, 2000)}
                alt={image.alt ?? ""}
                className="w-full md:w-auto md:h-full"
              />
              {/* Optional caption — comes from the image's alt text */}
              {image.displayCaption && image.alt ? (
                <p className="absolute bottom-0 left-0 p-3 text-monument-base text-white">
                  {image.alt}
                </p>
              ) : null}
            </div>
          );
        }
        if (image.type === "videoObject" && image.cloudId) {
          const dims = image.poster?.asset?.metadata?.dimensions;
          const posterUrl = image.poster?.asset?.url ?? undefined;
          return (
            <div
              key={index}
              className="md:h-full md:shrink-0 relative pointer-events-none overflow-hidden"
              style={{ aspectRatio: dims ? `${dims.width}/${dims.height}` : "16/9" }}
            >
              <CloudflareStream
                src={image.cloudId}
                poster={posterUrl}
                posterWidth={dims?.width}
                posterHeight={dims?.height}
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
