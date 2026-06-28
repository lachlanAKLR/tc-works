"use client";

import { Stream } from "@cloudflare/stream-react";

export default function CloudflareStream({
  src,
  className,
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  return (
    <Stream src={src} autoplay muted loop controls={false} poster={poster} className={className} />
  );
}
