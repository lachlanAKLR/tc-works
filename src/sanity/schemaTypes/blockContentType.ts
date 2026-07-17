import { createElement } from "react";
import type { PropsWithChildren } from "react";
import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons";

const FONT_SANS_BOLD = "var(--font-monument-bold, arial, sans-serif)";
const FONT_SERIF = "var(--font-garnier-reg, times, serif)";

const styleComponent = (
  tag: string,
  fontFamily: string,
  fontSize: string,
  lineHeight: string,
  extra: Record<string, string | number> = {},
) => {
  const Component = ({ children }: PropsWithChildren) =>
    createElement(
      tag,
      {
        style: {
          fontFamily,
          fontSize,
          lineHeight,
          margin: 0,
          ...extra,
        },
      },
      children,
    );
  return Component;
};

const SansBold = styleComponent("p", FONT_SANS_BOLD, "17px", "20.4px", { fontWeight: 700 });
const SerifLarge = styleComponent("p", FONT_SERIF, "32px", "38.4px", { fontWeight: 400 });

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Sans Bold", value: "normal", component: SansBold },
        { title: "Serif Large", value: "serifLarge", component: SerifLarge },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [{ title: "Emphasis", value: "em" }],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
});
