import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "videoObject",
  title: "Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "cloudId",
      title: "Cloudflare Stream ID",
      type: "string",
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "imageObject",
      description: "Fallback/loading image shown before the video plays.",
    }),
  ],
  preview: {
    select: {
      media: "poster",
      cloudId: "cloudId",
    },
    prepare({ media, cloudId }) {
      return {
        title: cloudId || "Untitled video",
        media,
      };
    },
  },
});
