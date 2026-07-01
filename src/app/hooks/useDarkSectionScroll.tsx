// hooks/useDarkSectionScroll.tsx
import { useEffect, useState } from "react";

export function useDarkSectionScroll(navHeight: number) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>(".dark");
      let active = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navHeight && rect.bottom > navHeight) {
          active = true;
        }
      });

      setIsDark(active);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navHeight]);

  return isDark;
}
