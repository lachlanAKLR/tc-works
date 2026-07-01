"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDarkSectionScroll } from "../hooks/useDarkSectionScroll";

export default function Nav() {
  const pathname = usePathname();
  const isDark = useDarkSectionScroll(36);

  const isStudio = pathname.includes("/studio");
  const isHome = pathname === "/";
  const isProject = pathname.includes("/project/");
  const isInfo = pathname === "/information";

  const textColor = isHome ? (isDark ? "text-black" : "text-white") : "text-black";

  return isStudio || isProject ? null : (
    <nav>
      <div className="fixed top-0 left-0 flex pt-6 pl-18 pb-0 pr-6 z-20 md:text-garnier-base text-garnier-sm">
        <div className={`${textColor} ${isInfo ? "opacity-20" : "opacity-100"} pr-1`}>
          <Link href="/">Works,</Link>
        </div>
        <div className={textColor}>
          <Link href="/information">Information</Link>
        </div>
      </div>
    </nav>
  );
}
