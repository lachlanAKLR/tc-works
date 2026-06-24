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
    <>
      <div className="fixed md:hidden h-13.5 w-full bg-linear-to-b from-white from-80% to-white/0 top-0 left-0 z-10" />
      <main className="px-6 site-grid md:text-garnier-base text-garnier-sm">
        {information?.about ? (
          <div className="col-span-16 md:col-span-10 h-auto md:h-screen justify-between flex flex-col pb-6 pt-12 md:pt-13.5 md:sticky top-0">
            <div>
              <PortableText
                value={information?.about}
                components={getPortableTextComponents(false)}
              />
            </div>
            <div className="pt-12 md:pt-0">
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

        <div className="md:col-start-12 md:col-end-17 col-start-1 col-end-17">
          {information?.titledLists ? (
            <div>
              {information.titledLists.map((list) => (
                <div className="pb-5" key={list.title}>
                  <div className="block md:sticky top-0 z-10">
                    <div className="flex flex-col justify-end h-16 bg-linear-to-b from-background from-80% to-background/0">
                      <h4 className="pb-2.5">{list.title}</h4>
                    </div>
                  </div>
                  <ul className="pl-9 pb-2 relative -top-2.5">
                    {list?.items?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {information?.instagram ? (
            <div>
              <div className="block md:sticky top-0 z-10">
                <div className="flex flex-col justify-end h-16 bg-linear-to-b from-background from-80% to-background/0">
                  <h4 className="pb-2.5">Follow</h4>
                </div>
              </div>
              <div className="pl-9 relative -top-2.5 pb-4">
                <a
                  href={information.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-1"
                >
                  Instagram,
                </a>
                <a
                  href={information.linkedin ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ) : null}

          {information?.address ? (
            <div className="pb-16">
              <div className="block md:sticky top-0 z-10">
                <div className="flex flex-col justify-end h-16 bg-linear-to-b from-background from-80% to-background/0">
                  <h4 className="pb-2.5">Office</h4>
                </div>
              </div>
              <div className="pl-9 relative -top-2.5">
                <PortableText
                  value={information?.address}
                  components={getPortableTextComponents(false)}
                />
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
            <div className="text-courier-sm md:text-courier-base pt-6 md:pb-80 pb-4">
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
    </>
  );
}
