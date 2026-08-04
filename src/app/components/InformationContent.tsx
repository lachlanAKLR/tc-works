import { INFORMATION_QUERYResult } from "../../../sanity.types";
import { PortableText } from "next-sanity";
import { getPortableTextComponents } from "./PortableTextComponents";
import Image from "next/image";
import { sanityImage } from "@/sanity/lib/image";
import Link from "next/link";

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
    <main className="px-3 site-grid-main text-monument-base pt-21 pb-3">
      <div className="col-span-12 md:col-span-6 flex flex-col gap-1 top-10 pb-12 md:pb-0 ">
        <div className="w-full md:sticky top-21">
          <div className="grid grid-cols-6 gap-3 w-full">
            <p className="pr-3 col-span-2 md:col-span-1">ENQUIRIES</p>
            <HoverArrowLink className="col-span-4" href={`mailto:${information?.email}`}>
              {information?.email}
            </HoverArrowLink>
          </div>
          <div className="grid grid-cols-6 gap-3 w-full">
            <p className="pr-3 col-span-2 md:col-span-1">OFFICE</p>
            <div className="col-span-4">
              <PortableText
                value={information?.address}
                components={getPortableTextComponents(false)}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 w-full">
            <p className="pr-3 col-span-2 md:col-span-1">FOLLOW</p>
            <div className="col-span-4">
              <HoverArrowLink className="pr-1" target="_blank" href={`${information?.instagram}`}>
                Instagram,
              </HoverArrowLink>
              <HoverArrowLink target="_blank" href={`${information?.linkedin}`}>
                Linkedin
              </HoverArrowLink>
            </div>
          </div>
        </div>
      </div>
      {information?.about ? (
        <div className="md:col-start-7 md:col-end-13 col-start-1 col-end-13">
          <PortableText value={information?.about} components={getPortableTextComponents(false)} />
        </div>
      ) : null}
      {information?.mainImage?.asset ? (
        <div className="col-span-12 mt-20 md:mt-100 flex flex-col-reverse gap-20 md:grid md:site-grid-main md:gap-3 pb-20 md:pb-0">
          <div className="col-span-6 self-auto md:self-end">
            <p>All work ©TOM CLAYTON and respective owners {new Date().getFullYear()}</p>
            <p>
              Website development by:{" "}
              <Link href="https://www.aklr.xyz/" target="_blank">
                AKLR Studio
              </Link>
            </p>
          </div>

          <div className="col-start-7 col-end-9 mt-0 md:-mt-4 w-1/2 md:w-full">
            <Image
              {...sanityImage(information.mainImage.asset, 800)}
              alt={information.mainImage.caption ?? ""}
              className="w-full h-auto"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
