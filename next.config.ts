import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image re-encodes whatever the CDN returns, at its own default of 75 unless the
    // <Image> carries a quality prop. Listing 90 alone makes that failure loud: an image
    // that misses the prop 400s instead of quietly shipping at 75.
    qualities: [90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
