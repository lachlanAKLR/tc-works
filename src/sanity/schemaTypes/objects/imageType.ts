import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const imageType = defineType({
  name: "imageObject",
  title: "Image",
  type: "image",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Title, Description.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayCaption",
      title: "Display Caption",
      type: "boolean",
      description:
        "Show the alt text as a caption over the image on the project page (project images only).",
      initialValue: false,
      options: { layout: "checkbox" },
    }),
  ],
});
