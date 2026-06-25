"use client";

import { useRef } from "react";

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onWheel(e: React.WheelEvent) {
    if (!ref.current || window.innerWidth < 768) return;
    e.preventDefault();
    ref.current.scrollLeft += e.deltaY;
  }

  return (
    <div
      ref={ref}
      onWheel={onWheel}
      className="flex flex-col md:flex-row md:h-screen h-auto overflow-x-scroll"
    >
      {children}
    </div>
  );
}
