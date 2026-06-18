import { INFORMATION_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import InformationContent from "../components/InformationContent";

export async function generateMetadata() {
  const { data } = await sanityFetch({
    query: INFORMATION_QUERY,
    stega: false,
  });
  return { title: data ? "Information" : "Information not found" };
}

export default async function InformationPage() {
  const { data: information } = await sanityFetch({
    query: INFORMATION_QUERY,
  });

  return <InformationContent information={information} />;
}
