import { defineType, defineField } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/ogg",
      },
    }),
    defineField({
      name: "cloudId",
      title: "Cloudflare Stream ID",
      type: "string",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image",
      type: "image",
    }),
    defineField({
      name: "isFourColumn",
      title: "4 Column (default 6)",
      type: "boolean",
      initialValue: false,
      options: { layout: "switch" },
    }),
    defineField({
      name: "isInset",
      title: "Inset Video",
      type: "boolean",
      initialValue: false,
      options: { layout: "switch" },
    }),
  ],

  preview: {
    select: {
      media: "posterImage",
      isFourColumn: "isFourColumn",
    },
    prepare({ media, isFourColumn }) {
      return {
        title: "Video",
        subtitle: isFourColumn ? "4 Column" : "Default Width",
        media,
      };
    },
  },
});
