import { INFORMATION_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import InformationContent from "../components/InformationContent";
import AnimatedSubtitle from "../components/AnimatedSubtitle";

export async function generateMetadata() {
  const { data } = await sanityFetch({
    query: INFORMATION_QUERY,
    stega: false,
  });
  return { title: data ? "About" : "Tom Clayton" };
}

export default async function InformationPage() {
  const { data: information } = await sanityFetch({
    query: INFORMATION_QUERY,
  });
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const animationText = settings?.animationText ?? [];

  return (
    <>
      {/* Same looping phrase animation as the home page, without the white overlay */}
      <AnimatedSubtitle phrases={animationText} />
      <InformationContent information={information} />
    </>
  );
}
