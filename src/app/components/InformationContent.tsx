import { INFORMATION_QUERYResult } from "../../../sanity.types";
import { PortableText } from "next-sanity";
import { PortableTextComponents } from "./PortableTextComponents";
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
    <main className="px-6 site-grid">
      {information?.about ? (
        <div className="col-span-16 md:col-span-10 h-screen justify-between flex flex-col pb-6 pt-13.5 sticky top-0">
          <div>
            <PortableText value={information?.about} components={PortableTextComponents} />
          </div>
          <div>
            <div>
              <span className="pr-3">E</span>
              {information.email}
            </div>
            <div>
              <span className="pr-3">P</span>
              {information.phone}
            </div>
          </div>
        </div>
      ) : null}

      <div className="col-start-12 col-end-17 pt-6">
        {information?.titledLists ? (
          <div>
            {information.titledLists.map((list) => (
              <div className="pb-16" key={list.title}>
                <h4>{list.title}</h4>
                <ul className="pl-9">
                  {list?.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {information?.instagram ? (
          <div className="pb-16">
            <h4>Follow</h4>
            <div className="pl-9">
              <a
                href={information.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pr-1"
              >
                Instagram,
              </a>
              <a href={information.linkedin ?? undefined} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        ) : null}

        {information?.address ? (
          <div className="pb-16">
            <h4>Office</h4>
            <div className="pl-9">
              <PortableText value={information?.address} components={PortableTextComponents} />
            </div>
          </div>
        ) : null}

        {information?.mainImage?.asset && (
          <Image
            src={builder
              .image(information.mainImage.asset as SanityImageSource)
              .width(2000)
              .fit("max")
              .auto("format")
              .url()}
            width={information?.mainImage?.asset?.metadata?.dimensions?.width ?? undefined}
            height={information?.mainImage?.asset?.metadata?.dimensions?.height ?? undefined}
            alt={information?.mainImage?.alt ?? ""}
            className="h-auto w-full"
          />
        )}

        {information?._updatedAt && (
          <div className="text-courier-base pt-6">
            <p>Last Update {formatUpdatedAt(information._updatedAt)}</p>
            <p>
              Website Development:
              <a href="https://aklr.xyz" target="_blank" rel="noopener noreferrer">
                AKLR
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
