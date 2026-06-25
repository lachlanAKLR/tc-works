"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProjectClose() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "200px",
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="md:hidden" />

      <div
        className={`text-garnier-sm text-white md:hidden fixed bottom-7.5 left-0 w-full text-center z-20 transition-opacity duration-200 ${
          hidden ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Link href="/">(Close)</Link>
      </div>

      <div className="hidden md:block sticky right-0 top-0 h-0 shrink-0">
        <Link href="/" className="absolute top-6 right-6 text-white">
          (Close)
        </Link>
      </div>
    </>
  );
}
