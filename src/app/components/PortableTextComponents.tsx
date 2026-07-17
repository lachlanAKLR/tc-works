import { PortableTextReactComponents } from "@portabletext/react";

export function getPortableTextComponents(indent = true): Partial<PortableTextReactComponents> {
  return {
    block: {
      normal: ({ children }) => (
        <p className={`first:indent-0 indent-12 text-monument-base`}>{children}</p>
      ),
      serifLarge: ({ children }) => <h2 className="text-garnier-base pb-4">{children}</h2>,
    },
  };
}
