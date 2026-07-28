"use client";

import { usePathname } from "next/navigation";

// Fades each page in on navigation. Keying on the pathname remounts the subtree
// on every route change, replaying the opacity-0 -> opacity-100 animation.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-fade">
      {children}
    </div>
  );
}
