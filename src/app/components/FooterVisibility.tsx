"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isStudio = pathname.includes("/studio");
  const isProject = pathname.includes("/project/");
  const isIndex = pathname.includes("/overview");
  const isAbout = pathname.includes("/about");

  return isStudio || isProject || isIndex || isAbout ? null : <>{children}</>;
}
