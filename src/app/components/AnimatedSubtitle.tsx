"use client";

import TextAnimation from "./TextAnimation";

// Fixed subtitle that runs the typewriter in the same spot as the home scroll
// title / intro animation. Used on the index and about pages (no white overlay).
export default function AnimatedSubtitle({
  phrases,
  holdFull,
}: {
  phrases: string[];
  holdFull?: number;
}) {
  if (phrases.length === 0) return null;

  return (
    <div className="fixed left-35 top-2.25 z-50 pr-10 text-monument-base pointer-events-none">
      <TextAnimation phrases={phrases} loop holdFull={holdFull} />
    </div>
  );
}
