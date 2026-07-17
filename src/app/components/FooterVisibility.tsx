"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isStudio = pathname.includes("/studio");
  const isProject = pathname.includes("/project/");

  return isStudio || isProject ? null : <>{children}</>;
}
