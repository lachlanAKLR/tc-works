"use client";

import { useState } from "react";
import { PortableText } from "next-sanity";
import { getPortableTextComponents } from "./PortableTextComponents";

type Props = {
  info: Block[] | null | undefined;
};

type Block = { _type: string; children?: { text?: string }[] };

export default function ProjectInfo({ info }: Props) {
  const [expanded, setExpanded] = useState(false);
  const blocks = info ?? [];
  const otherBlocks = blocks.slice(0, -1);
  const lastBlock = blocks[blocks.length - 1];
  const lastBlockText = lastBlock?.children?.map((c) => c.text).join("") ?? "";

  const button = expanded ? (
    <button
      className="text-garnier-sm underline underline-offset-2 decoration-[0.75px]"
      onClick={() => setExpanded(false)}
    >
      {" "}
      Less
    </button>
  ) : (
    <button
      className="text-garnier-sm underline underline-offset-2 decoration-[0.75px]"
      onClick={() => setExpanded(true)}
    >
      {" "}
      Read More
    </button>
  );

  return (
    <div className="md:hidden">
      <div className={expanded ? "" : "line-clamp-8"}>
        <PortableText value={otherBlocks} components={getPortableTextComponents()} />
        <p className="text-garnier-sm indent-12">
          {lastBlockText}
          {expanded && (
            <button
              className="text-garnier-sm underline underline-offset-2 pl-1 decoration-[0.75px]"
              onClick={() => setExpanded(false)}
            >
              {" "}
              Less
            </button>
          )}
        </p>
      </div>
      {!expanded && (
        <button
          className="text-garnier-sm underline underline-offset-2 decoration-[0.75px]"
          onClick={() => setExpanded(true)}
        >
          Read More
        </button>
      )}
    </div>
  );
}
