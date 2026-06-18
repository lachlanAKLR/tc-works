import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const imageType = defineType({
  name: "imageObject",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "asset",
      type: "image",
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Title, Description.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: "asset",
      title: "alt",
    },
  },
});
