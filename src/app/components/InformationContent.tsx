import { INFORMATION_QUERYResult } from "../../../sanity.types";
import { PortableText } from "next-sanity";
import { getPortableTextComponents } from "./PortableTextComponents";
import { dataset, projectId } from "@/sanity/env";
import Image from "next/image";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({ projectId, dataset });

function formatUpdatedAt(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

// Link that pops a "↗ " marker in on hover, pushing the text out. No transition —
// a hard show/hide for the web 1.0 feel.
function HoverArrowLink({
  href,
  target,
  className,
  children,
}: {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target={target} className={`group ${className ?? ""}`}>
      <span className="hidden group-hover:inline">↗ </span>
      {children}
    </a>
  );
}

export default function Informationinformation({
  information,
}: {
  information: INFORMATION_QUERYResult;
}) {
  return (
    <main className="px-3 site-grid-main text-monument-base py-21">
      <div className="col-span-12 md:col-span-6 flex flex-col gap-1 md:fixed pb-12 md:pb-0">
        <div className="grid grid-cols-6 gap-3">
          <p className="pr-3 col-span-1">ENQUIRIES</p>
          <HoverArrowLink className="col-span-5" href={`mailto:${information?.email}`}>
            {information?.email}
          </HoverArrowLink>
        </div>
        <div className="grid grid-cols-6 gap-3">
          <p className="pr-3 col-span-1">OFFICE</p>
          <div className="col-span-5">
            <PortableText
              value={information?.address}
              components={getPortableTextComponents(false)}
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3">
          <p className="pr-3 col-span-1">FOLLOW</p>
          <div className="col-span-5">
            <HoverArrowLink className="pr-1" target="_blank" href={`${information?.instagram}`}>
              Instagram,
            </HoverArrowLink>
            <HoverArrowLink target="_blank" href={`${information?.linkedin}`}>
              Linkedin
            </HoverArrowLink>
          </div>
        </div>
      </div>
      {information?.about ? (
        <div className="md:col-start-7 md:col-end-13 col-start-1 col-end-13">
          <div>
            <PortableText
              value={information?.about}
              components={getPortableTextComponents(false)}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
