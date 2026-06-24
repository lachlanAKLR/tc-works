import { notFound } from "next/navigation";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectContent from "@/app/components/ProjectContent";
import ProjectImages from "@/app/components/ProjectImages";
import HorizontalScroll from "@/app/utils/horizontalScroll";
import ProjectRelated from "@/app/components/ProjectRelated";
import Link from "next/link";

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
    .filter((p) => p._id !== project?._id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  if (!project) {
    return notFound();
  }

  return (
    <HorizontalScroll>
      <ProjectContent project={project} />
      <ProjectImages project={project} />
      <div className="hidden md:block sticky right-0 top-0 h-0 shrink-0">
        <Link href="/" className="absolute top-6 right-6 text-white">
          (Close)
        </Link>
      </div>
      <ProjectRelated projects={related} />
    </HorizontalScroll>
  );
}
