"use client";

import { useEffect, useState } from "react";
import TextAnimation from "./TextAnimation";

const SEEN_KEY = "tc-intro-played";

// First-entry landing overlay: a white screen showing only "TOM CLAYTON" and the
// phrase animation (in the same spot as the scroll title), which plays through the
// phrases once and then fades away to reveal the projects. Plays once per session.
export default function HomeIntro({ phrases }: { phrases: string[] }) {
  // Start visible when there are phrases so the very first paint is the white screen.
  const [active, setActive] = useState(phrases.length > 0);
  const [fading, setFading] = useState(false);

  // Post-mount skips: already seen this session, or reduced-motion preference.
  useEffect(() => {
    if (phrases.length === 0) return;
    const seen = sessionStorage.getItem(SEEN_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) setActive(false);
  }, [phrases.length]);

  // Lock page scroll while the overlay is up
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  if (!active) return null;

  const handleDone = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setFading(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[200] bg-white text-black dark:bg-black dark:text-white transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onTransitionEnd={() => {
        if (fading) setActive(false);
      }}
    >
      {/* TOM CLAYTON — mirrors Nav's top bar so it lands seamlessly on fade-out */}
      <div className="fixed top-0 left-0 pt-2.25 text-monument-base w-full h-9 site-grid-main px-3">
        <h1 className="col-span-6">TOM CLAYTON</h1>
      </div>

      {/* Phrase animation — same position as the "is open for business" scroll title */}
      <div className="fixed left-35 top-2.25 pr-10 text-monument-base">
        <TextAnimation phrases={phrases} loop={false} onDone={handleDone} />
      </div>
    </div>
  );
}
