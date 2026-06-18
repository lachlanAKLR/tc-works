import { defineType, defineField } from "sanity";

export const titledList = defineType({
  name: "titledList",
  title: "Titled List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Untitled List",
        subtitle: items
          ? `${items.length} item${items.length === 1 ? "" : "s"}`
          : "No items",
      };
    },
  },
});
