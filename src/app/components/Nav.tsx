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

  const links = (
    <>
      <Link href="/">{isHome || isProject ? "WORKS," : "Works,"}</Link>
      <Link href="/overview">{isIndex ? "INDEX," : "Index,"}</Link>
      <Link href="/about">{isAbout ? "ABOUT" : "About"}</Link>
    </>
  );

  // The bar spans the full width but is transparent, so it lets clicks through
  // to whatever sits beneath it (e.g. the project page's CLOSE link).
  return isStudio ? null : (
    <nav>
      <div className="fixed top-0 left-0 pt-2.25 z-50 text-monument-base w-full h-9 site-grid-main px-3 pointer-events-none">
        {isProject ? null : (
          <h1 className="col-span-6 pointer-events-auto w-fit">
            <Link href="/">TOM CLAYTON</Link>
          </h1>
        )}
        <div className="hidden md:flex gap-1 col-start-7 col-end-13 pointer-events-auto w-fit">
          {links}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 z-100 w-full h-15 flex items-end justify-center pb-3 text-monument-base bg-linear-to-b from-white/0 to-white dark:from-black/0 dark:to-black">
        <div className="flex gap-1">{links}</div>
      </div>
    </nav>
  );
}
