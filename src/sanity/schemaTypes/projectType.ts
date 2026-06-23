import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: "meta",
      title: "Metadata",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "homeLayout",
      title: "Home Layout",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      description:
        "Optional context under the title — e.g. a studio he worked within (Base Design) or left blank if the project is his own client (Midi Coffee).",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      fieldset: "meta",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "serviceTag" }] }],
      fieldset: "meta",
    }),
    defineField({
      name: "collaborators",
      title: "Collaborators",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collaboratorTag" }] }],
      fieldset: "meta",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "imageObject",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homeImageWidth",
      title: "Home Image Width",
      type: "number",
      fieldset: "homeLayout",
      description:
        "How many grid columns the main image spans on the home page (3–16, out of 16 total).",
      validation: (Rule) => Rule.min(3).max(16).integer(),
      initialValue: 16,
    }),
    defineField({
      name: "alignRight",
      title: "Align Right",
      type: "boolean",
      fieldset: "homeLayout",
      initialValue: false,
      options: { layout: "switch" },
    }),
    defineField({
      name: "info",
      title: "Project Info",
      type: "blockContent",
      description: "Longer-form write-up shown on the project detail page.",
    }),
    defineField({
      name: "projectImages",
      title: "Project Images",
      type: "array",
      of: [{ type: "imageObject" }, { type: "videoObject" }],
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subheading: "subheading",
      media: "mainImage",
    },
    prepare({ title, subheading, media }) {
      return {
        title,
        subtitle: subheading,
        media,
      };
    },
  },
});
