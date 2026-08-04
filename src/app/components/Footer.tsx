import { sanityFetch } from "@/sanity/lib/live";
import { INFORMATION_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import FooterVisibility from "./FooterVisibility";
import Image from "next/image";
import { sanityImage } from "@/sanity/lib/image";

export default async function Footer() {
  // Contact links come from Information; the footer image lives in Site Settings.
  const { data: information } = await sanityFetch({ query: INFORMATION_QUERY });
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const footerImage = settings?.footerImage;

  return (
    <FooterVisibility>
      <footer id="site-footer">
        <div className="h-screen flex flex-col justify-center items-center relative">
          <div className="text-[44px] md:text-[128px] -rotate-3 text-center">
            <a className="md:pr-5 pr-2" href={`mailto:${information?.email}`}>
              Email,
            </a>
            <a href={`${information?.instagram}`}>Instagram</a>
          </div>
          {footerImage?.asset && (
            <div className="site-grid-main w-full absolute bottom-0 p-3">
              <div className="col-start-1 col-end-8 self-end">
                <p>{footerImage.alt}</p>
              </div>
              <div className="col-start-9 md:col-start-11 col-end-13 flex justify-end">
                <Image
                  {...sanityImage(footerImage.asset, 2000)}
                  alt={footerImage.alt ?? ""}
                  className="w-full md:w-auto md:h-full"
                />
              </div>
            </div>
          )}
        </div>
      </footer>
    </FooterVisibility>
  );
}
