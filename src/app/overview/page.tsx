import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectIndex from "../components/ProjectIndex";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <main>
      <ProjectIndex projects={projects} />
    </main>
  );
}
