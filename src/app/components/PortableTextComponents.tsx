import { PortableTextReactComponents } from "@portabletext/react";

export function getPortableTextComponents(indent = true): Partial<PortableTextReactComponents> {
  return {
    block: {
      normal: ({ children }) => (
        <p
          className={`${indent ? "indent-12" : "first:indent-0 indent-12"} md:text-garnier-base text-garnier-sm`}
        >
          {children}
        </p>
      ),
      h4: ({ children }) => <h4 className="">{children}</h4>,
      small: ({ children }) => <p className="">{children}</p>,
    },
  };
}
