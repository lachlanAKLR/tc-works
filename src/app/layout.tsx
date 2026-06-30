"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const mainItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Projects", href: "/projects", hasDropdown: false },
  { label: "Expertise", href: null, hasDropdown: true },
  { label: "Studio", href: "/studio", hasDropdown: false },
  { label: "Journal", href: "/journal", hasDropdown: false },
  { label: "Contact", href: "/contact", hasDropdown: false },
];

const expertiseItems = [
  { label: "Commercial", href: "/expertise/commercial" },
  { label: "Residential", href: "/expertise/residential" },
];

export default function Nav() {
  const [expanded, setExpanded] = useState(false);
  const [fullyExpanded, setFullyExpanded] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const innerRef = useRef<HTMLDivElement>(null);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!fullyExpanded) return;
    const el = itemRefs.current[index];
    const parent = innerRef.current;
    if (!el || !parent) return;
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setPillStyle({ left: elRect.left - parentRect.left, width: elRect.width });
  };

  const handleMouseLeave = () => setPillStyle(null);

  const handleNavMouseEnter = () => {
    setExpanded(true);
    // match the 450ms width transition before enabling highlight
    expandTimerRef.current = setTimeout(() => setFullyExpanded(true), 450);
  };

  const handleNavMouseLeave = () => {
    if (expertiseOpen) return;
    if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    setExpanded(false);
    setFullyExpanded(false);
    setPillStyle(null);
  };

  const closeAll = () => {
    if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
    setExpertiseOpen(false);
    setExpanded(false);
    setFullyExpanded(false);
    setPillStyle(null);
  };

  const itemTransition = (i: number) =>
    expanded ? `opacity 300ms ease ${150 + i * 60}ms` : `opacity 110ms ease`;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className="relative flex items-center"
        style={{
          height: "34px",
          background: "rgba(231, 231, 231, 0.50)",
          backdropFilter: "blur(10px)",
          borderRadius: "100px",
          width: expanded ? "540px" : "80px",
          overflow: "visible",
          transition: "width 450ms ease-in-out",
        }}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        {/* Menu label */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: expanded ? 0 : 1,
            transition: expanded ? "opacity 150ms ease" : "opacity 225ms ease 225ms",
            pointerEvents: expanded ? "none" : "auto",
          }}
        >
          <span className="text-body-base select-none">Menu</span>
        </div>

        {/* Expanded items */}
        <div ref={innerRef} className="relative flex items-center px-1">
          {/* Gliding pill — only renders once fully expanded */}
          {pillStyle && fullyExpanded && (
            <div
              className="pointer-events-none absolute rounded-[100px] bg-white"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                height: "26px",
                top: "50%",
                transform: "translateY(-50%)",
                transition: "left 200ms ease, width 200ms ease",
              }}
            />
          )}

          {mainItems.map((item, i) =>
            item.hasDropdown ? (
              <div key={item.label} className="relative">
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="text-body-base relative z-10 flex items-center gap-1 rounded-[100px] px-3"
                  style={{
                    height: "26px",
                    opacity: expanded ? 1 : 0,
                    pointerEvents: expanded ? "auto" : "none",
                    transition: itemTransition(i),
                  }}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setExpertiseOpen((v) => !v)}
                >
                  {item.label}
                  <span
                    className="text-xs"
                    style={{
                      display: "inline-block",
                      transition: "transform 300ms ease",
                      transform: expertiseOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    ›
                  </span>
                </button>

                {expertiseOpen && (
                  <div className="absolute left-0 top-full pt-2" onMouseLeave={closeAll}>
                    <div className="flex flex-col gap-1">
                      {expertiseItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="text-body-base relative whitespace-nowrap rounded-[100px] px-3 py-1 hover:bg-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="text-body-base relative z-10 flex items-center whitespace-nowrap rounded-[100px] px-3"
                style={{
                  height: "26px",
                  opacity: expanded ? 1 : 0,
                  pointerEvents: expanded ? "auto" : "none",
                  transition: itemTransition(i),
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>

      {expertiseOpen && <div className="fixed inset-0 z-40" onClick={closeAll} />}
    </div>
  );
}
