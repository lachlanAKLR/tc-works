import { notFound } from "next/navigation";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectContent from "@/app/components/ProjectContent";
import ProjectImages from "@/app/components/ProjectImages";
import HorizontalScroll from "@/app/utils/horizontalScroll";
import ProjectRelated from "@/app/components/ProjectRelated";
import ProjectClose from "@/app/components/ProjectClose";

export async function generateStaticParams() {
  const projects = await client.fetch(PROJECTS_QUERY);
  return projects.map((project) => ({
    slug: project?.slug?.current,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: resolvedParams.slug },
  });

  const related = projects
    .filter((p) => p._id !== project?._id && p.mainImage?.asset)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  if (!project) {
    return notFound();
  }

  return (
    <HorizontalScroll>
      <ProjectClose />
      <ProjectContent project={project} />
      <ProjectImages project={project} />
      <ProjectRelated projects={related} />
    </HorizontalScroll>
  );
}
