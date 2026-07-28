import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import ProjectIndex from "../components/ProjectIndex";
import AnimatedSubtitle from "../components/AnimatedSubtitle";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const indexSubtitle = settings?.indexSubtitle;

  return (
    <main>
      {/* Animated index subtitle — types in on load, replays ~every 5s */}
      <AnimatedSubtitle phrases={indexSubtitle ? [indexSubtitle] : []} holdFull={5000} />
      <ProjectIndex projects={projects} />
    </main>
  );
}
