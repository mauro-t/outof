import { animate, scroll } from "motion";
import { type UseScrollOptions } from "motion/react";

export function animateSections() {
  const sections = document.querySelectorAll<HTMLElement>("[data-section]");

  sections.forEach((section) => {
    const sectionType = section.dataset.section;
    const y = sectionType == "last" ? [0] : [0, 300];
    const offset: UseScrollOptions["offset"] =
      sectionType == "short"
        ? ["start 72px", "end start"]
        : ["end end", "end start"];
    scroll(animate(section, { y }), { target: section, offset });
  });
}
