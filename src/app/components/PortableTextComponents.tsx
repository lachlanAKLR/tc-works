import { PortableTextReactComponents } from "@portabletext/react";

export const PortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="indent-12 first:indent-0">{children}</p>
    ),
    h4: ({ children }) => <h4 className="">{children}</h4>,
    small: ({ children }) => <p className="">{children}</p>,
  },
};
