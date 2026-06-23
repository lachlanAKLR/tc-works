import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const informationType = defineType({
  name: "information",
  title: "Information",
  type: "document",
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: "contact",
      title: "Contact Details",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "about",
      type: "blockContent",
    }),
    defineField({
      name: "mainImage",
      type: "imageObject",
    }),
    defineField({
      name: "email",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "phone",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "instagram",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "linkedin",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "address",
      type: "blockContent",
      fieldset: "contact",
    }),
    defineField({
      name: "titledLists",
      title: "Titled Lists",
      type: "array",
      of: [{ type: "titledList" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Information",
      };
    },
  },
});
