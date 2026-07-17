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
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "about",
      type: "blockContent",
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
      name: "footerImage",
      title: "Footer Image",
      type: "imageObject",
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
