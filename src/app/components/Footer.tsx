import { sanityFetch } from "@/sanity/lib/live";
import { INFORMATION_QUERY } from "@/sanity/lib/queries";
import FooterVisibility from "./FooterVisibility";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder({ projectId, dataset });

export default async function Footer() {
  const { data: information } = await sanityFetch({ query: INFORMATION_QUERY });

  return (
    <FooterVisibility>
      <footer id="site-footer">
        <div className="h-screen flex flex-col justify-center items-center relative">
          <div className="text-[128px] -rotate-3">
            <a className="pr-5 " href={`mailto:${information?.email}`}>
              Email,
            </a>
            <a href={`${information?.instagram}`}>Instagram</a>
          </div>
          <div className="site-grid-main w-full absolute bottom-0 p-3">
            <div className="col-start-1 col-end-6 self-end">
              <p>{information.footerImage.alt}</p>
            </div>
            <div className="col-start-11 col-end-13">
              <Image
                src={builder
                  .image(information.footerImage.asset as SanityImageSource)
                  .width(2000)
                  .fit("max")
                  .auto("format")
                  .url()}
                width={information.footerImage.asset.metadata?.dimensions?.width ?? undefined}
                height={information.footerImage.asset.metadata?.dimensions?.height ?? undefined}
                alt={information.footerImage.alt ?? ""}
                className="w-full md:w-auto md:h-full"
              />
            </div>
          </div>
        </div>
      </footer>
    </FooterVisibility>
  );
}
