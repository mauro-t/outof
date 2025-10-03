import { inView } from "motion";
import type { UseInViewOptions } from "motion/react";

const scripts = import.meta.glob<{ default: () => void }>("../scripts/*.ts");

function isHTMLOrSVGElement(el: Element) {
  return el instanceof HTMLElement || el instanceof SVGElement;
}

export function lazyLoad(rootMargin: UseInViewOptions["margin"] = "512px 0px") {
  inView(
    "[data-ts]",
    (entry) => {
      if (!isHTMLOrSVGElement(entry))
        throw new Error("Elements with [data-ts] must be HTML or SVG");

      let fileName = entry.dataset.ts;

      if (!fileName) throw new Error("Empty file name for [data-ts] element");

      if (!fileName.endsWith(".ts")) fileName += ".ts";

      const filePath = `../scripts/${fileName}`;

      const script = scripts[filePath];

      if (!script) throw new Error(`Script ${fileName} not found`);
      let cleanup: (() => void) | void;
      (async () => {
        const module = await script();
        if (!module.default)
          throw new Error(`Script ${fileName} has no default export`);

        cleanup = module.default();
      })();

      return () => {
        if (cleanup) cleanup();
      };
    },
    {
      margin: rootMargin,
    },
  );
}
