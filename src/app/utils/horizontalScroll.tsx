"use client";

import { useRef } from "react";

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onWheel(e: React.WheelEvent) {
    if (!ref.current) return;
    e.preventDefault();
    ref.current.scrollLeft += e.deltaY;
  }

  return (
    <div ref={ref} onWheel={onWheel} className="flex flex-row h-screen overflow-x-scroll">
      {children}
    </div>
  );
}
