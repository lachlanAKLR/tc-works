"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { colSpanMap, colStartMap } from "@/app/utils/colSpanMap";
import Link from "next/link";
import CloudflareStream from "./CloudflareStream";

const builder = createImageUrlBuilder({ projectId, dataset });

const LINE = 36; // detection line from top — matches useDarkSectionScroll(36)

function ProjectTile({ project }: { project: PROJECTS_QUERYResult[number] }) {
  const dims = project?.mainVideo?.poster?.asset?.metadata?.dimensions;
  const posterUrl = project?.mainVideo?.poster?.asset?.url ?? undefined;

  return (
    <Link href={`/project/${project.slug?.current}`} className="block">
      {project?.mainVideo?.cloudId ? (
        <div
          className="pointer-events-none aspect-3/4 md:aspect-auto"
          style={{ aspectRatio: dims ? `${dims.width}/${dims.height}` : undefined }}
        >
          <CloudflareStream
            src={project.mainVideo.cloudId}
            poster={posterUrl}
            className="h-full w-full object-cover"
          />
        </div>
      ) : project?.mainImage?.asset ? (
        <Image
          src={builder
            .image(project.mainImage.asset as SanityImageSource)
            .width(4000)
            .quality(100)
            .fit("max")
            .auto("format")
            .url()}
          width={project?.mainImage?.asset?.metadata?.dimensions?.width ?? undefined}
          height={project?.mainImage?.asset?.metadata?.dimensions?.height ?? undefined}
          alt={project?.mainImage?.alt ?? ""}
          className="aspect-3/4 w-full object-cover md:aspect-auto md:h-auto md:object-fill"
        />
      ) : null}
    </Link>
  );
}

export default function ProjectsTiles({ projects }: { projects: PROJECTS_QUERYResult }) {
  const [activeId, setActiveId] = useState<string | null>(projects[0]?._id ?? null);
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const computeActive = () => {
      let current = projects[0]?._id ?? null;
      refs.current.forEach((el, id) => {
        if (el.getBoundingClientRect().top <= LINE) current = id;
      });
      setActiveId(current);
    };

    computeActive();
    const raf = requestAnimationFrame(computeActive);
    window.addEventListener("load", computeActive);
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", computeActive);
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [projects]);

  const activeProject = projects.find((p) => p._id === activeId);

  return (
    <div>
      <h1
        className={`md:text-garnier-base text-garnier-sm fixed top-12 left-3.5 md:top-13.5 md:left-5 z-10 pointer-events-none w-full pr-10 ${
          activeProject?.darkText ? "text-black" : "text-white"
        }`}
      >
        {activeProject?.title}
        {activeProject?.subheading ? `, ${activeProject.subheading}` : ""}
      </h1>

      <div className="flex flex-col md:grid md:site-grid">
        {projects.map((project) => (
          <div
            key={project._id}
            ref={(el) => {
              if (el) refs.current.set(project._id, el);
              else refs.current.delete(project._id);
            }}
            className={`relative isolate
              md:pb-13.25 md:-mb-13.25 md:last:pb-0 md:last:mb-0
              ${colSpanMap[project.homeImageWidth ?? 16] ?? "col-span-16"}
              ${project.alignRight ? (colStartMap[project.homeImageWidth ?? 16] ?? "") : ""}
              ${project.darkText ? "dark" : ""}
            `}
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
