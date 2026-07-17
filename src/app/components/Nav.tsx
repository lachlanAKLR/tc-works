"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isStudio = pathname.includes("/studio");
  const isProject = pathname.includes("/project/");
  const isHome = pathname === "/";
  const isIndex = pathname.includes("/overview");
  const isAbout = pathname.includes("/about");

  return isStudio ? null : (
    <nav>
      <div className="fixed top-0 left-0 pt-2.25 z-20 text-monument-base  w-full h-9 site-grid-main px-3">
        {isProject ? null : <h1 className="col-span-6">TOM CLAYTON</h1>}
        <div className="flex gap-1">
          <Link href="/">{isHome || isProject ? "WORKS," : "Works,"}</Link>
          <Link href="/overview">{isIndex ? "INDEX," : "Index,"}</Link>
          <Link href="/about">{isAbout ? "ABOUT" : "About"}</Link>
        </div>
      </div>
    </nav>
  );
}
