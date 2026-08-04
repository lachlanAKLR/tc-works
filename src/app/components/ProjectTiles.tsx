"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS_QUERYResult } from "../../../sanity.types";
import Image from "next/image";
import { sanityImage } from "@/sanity/lib/image";
import { colSpanMap, colStartMap } from "@/app/utils/colSpanMap";
import Link from "next/link";
import CloudflareStream from "./CloudflareStream";
import TextAnimation from "./TextAnimation";

const LINE = 36;

function ProjectTile({ project }: { project: PROJECTS_QUERYResult[number] }) {
  const dims = project?.mainVideo?.poster?.asset?.metadata?.dimensions;
  const posterUrl = project?.mainVideo?.poster?.asset?.url ?? undefined;

  return (
    <Link href={`/project/${project.slug?.current}`} className="block">
      {project?.mainVideo?.cloudId ? (
        <div className="pointer-events-none aspect-3/4 md:aspect-auto">
          <CloudflareStream
            src={project.mainVideo.cloudId}
            poster={posterUrl}
            posterWidth={dims?.width}
            posterHeight={dims?.height}
            className="h-full w-full object-cover"
          />
        </div>
      ) : project?.mainImage?.asset ? (
        <Image
          {...sanityImage(project.mainImage.asset, 2000)}
          alt={project?.mainImage?.alt ?? ""}
          className="aspect-3/4 w-full object-cover md:aspect-auto md:h-auto md:object-fill"
        />
      ) : null}
    </Link>
  );
}

export default function ProjectsTiles({
  projects,
  animationText = [],
}: {
  projects: PROJECTS_QUERYResult;
  animationText?: string[];
}) {
  const [activeId, setActiveId] = useState<string | null>(projects[0]?._id ?? null);
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const computeActive = () => {
      let current = projects[0]?._id ?? null;
      refs.current.forEach((el, id) => {
        if (el.getBoundingClientRect().top <= LINE) current = id;
      });
      setActiveId(current);

      const footer = document.getElementById("site-footer");
      setFooterVisible(!!footer && footer.getBoundingClientRect().top < window.innerHeight);
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
    <div className="min-h-screen">
      <h1
        className="text-monument-base fixed left-35 top-2.25 z-50 pointer-events-none w-4/5 md:w-full pr-10 text-black dark:text-white whitespace-pre-line
    "
      >
        {footerVisible ? (
          animationText.length > 0 ? (
            <TextAnimation phrases={animationText} loop />
          ) : (
            "is open for business"
          )
        ) : (
          <>
            {activeProject?.title}
            {activeProject?.subheading ? `, ${activeProject.subheading}` : ""}
          </>
        )}
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
            `}
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
