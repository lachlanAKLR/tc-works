import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsTiles from "./components/ProjectTiles";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <main>
      <ProjectsTiles projects={projects} />
    </main>
  );
}
