"use client";

import { usePathname } from "next/navigation";

// Fades each page in on navigation. Keying on the pathname remounts the subtree
// on every route change, so the animation replays.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-fade">
      {children}
    </div>
  );
}
