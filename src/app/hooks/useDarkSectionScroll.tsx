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

    // Re-check once more after paint, in case .dark tiles weren't
    // committed to the DOM yet when this effect first ran
    const raf = requestAnimationFrame(handleScroll);

    // Re-check whenever tiles are added/removed (covers race with ProjectsTiles mounting)
    const mutationObserver = new MutationObserver(handleScroll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(raf);
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [navHeight]);

  return isDark;
}
