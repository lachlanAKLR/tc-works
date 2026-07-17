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

export default function Informationinformation({
  information,
}: {
  information: INFORMATION_QUERYResult;
}) {
  return (
    <main className="px-3 site-grid-main text-monument-base py-21">
      <div className="col-span-6 flex flex-col gap-1 fixed">
        <div className="grid grid-cols-6 gap-3">
          <p className="pr-3 col-span-1">ENQUIRIES</p>
          <a className="col-span-5" href={`mailto:${information?.email}`}>
            {information?.email}
          </a>
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
            <a className="pr-1" target="_blank" href={`${information?.instagram}`}>
              Instagram,
            </a>
            <a target="_blank" href={`${information?.linkedin}`}>
              Linkedin
            </a>
          </div>
        </div>
      </div>
      {information?.about ? (
        <div className="col-start-7 col-end-13">
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
