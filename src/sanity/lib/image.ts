import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

type SanityImageAsset = {
  _id: string;
  metadata?: {
    dimensions?: { width: number | null; height: number | null } | null;
  } | null;
};

// Caps delivery at `maxWidth` (never upscaling past the source asset) and derives the
// matching height from the real aspect ratio, so next/image gets an honest intrinsic
// size instead of the full-resolution original — this is what keeps both the Sanity-side
// render and next/image's own srcset generation from ballooning past what's displayed.
//
// `quality` rides along in the return so it lands on <Image> as a prop: it governs both
// hops, the Sanity render and next/image's re-encode. Without the prop next/image falls
// back to its own default of 75 and throws away whatever Sanity rendered. Any value used
// here must also be listed in images.qualities in next.config.ts.
export function sanityImage(asset: SanityImageAsset, maxWidth: number, quality = 90) {
  const dimensions = asset.metadata?.dimensions;
  const width = Math.min(dimensions?.width || maxWidth, maxWidth);
  const height =
    dimensions?.width && dimensions?.height
      ? Math.round((dimensions.height / dimensions.width) * width)
      : width;

  return {
    src: urlFor(asset._id).width(width).fit("max").auto("format").quality(quality).url(),
    width,
    height,
    quality,
  };
}
