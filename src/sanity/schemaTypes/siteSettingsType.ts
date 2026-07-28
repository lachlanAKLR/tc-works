import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "footerImage",
      title: "Footer Image",
      type: "imageObject",
    }),
    defineField({
      name: "animationText",
      title: "Text Animation",
      type: "array",
      of: [{ type: "string" }],
      description: "Lines of text cycled through in the site's text animation.",
    }),
    defineField({
      name: "indexSubtitle",
      title: "Index Subtitle",
      type: "string",
      description: "Animated subtitle for index page",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
