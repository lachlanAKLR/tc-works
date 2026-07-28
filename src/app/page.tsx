import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import ProjectsTiles from "./components/ProjectTiles";
import HomeIntro from "./components/HomeIntro";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const animationText = settings?.animationText ?? [];

  return (
    <main>
      <HomeIntro phrases={animationText} />
      <ProjectsTiles projects={projects} animationText={animationText} />
    </main>
  );
}
