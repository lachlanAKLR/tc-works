"use client";

import { Stream } from "@cloudflare/stream-react";
import Image from "next/image";
import { useState } from "react";

export default function CloudflareStream({
  src,
  className,
  poster,
  posterWidth,
  posterHeight,
}: {
  src: string;
  className?: string;
  poster?: string;
  posterWidth?: number | null;
  posterHeight?: number | null;
}) {
  const [videoReady, setVideoReady] = useState(false);

  // Poster dimensions stand in for the video's — Stream gives us no intrinsic size.
  // Inert wherever the parent already fixes both width and height.
  const aspectRatio = posterWidth && posterHeight ? `${posterWidth}/${posterHeight}` : undefined;

  return (
    <div className="relative w-full h-full" style={{ aspectRatio }}>
      {poster && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${videoReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <Image src={poster} alt="" fill className="object-cover" priority />
        </div>
      )}
      <Stream
        src={src}
        autoplay
        muted
        loop
        controls={false}
        className={`block ${className}`}
        onCanPlay={() => setVideoReady(true)}
      />
    </div>
  );
}
