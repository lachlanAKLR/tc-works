"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isStudio = pathname.includes("/studio");
  const isHome = pathname === "/";
  const isProject = pathname.includes("/project/");

  return isStudio || isProject ? null : (
    <nav>
      <div
        className={`fixed top-0 left-0 flex pt-6 pl-18 pb-0 pr-6 z-20 md:text-garnier-base text-garnier-sm text-black ${
          isHome ? "text-white" : ""
        }`}
      >
        <div className="pr-1">
          <Link href="/">Works,</Link>
        </div>
        <div>
          <Link href="/information">Information</Link>
        </div>
      </div>
    </nav>
  );
}
