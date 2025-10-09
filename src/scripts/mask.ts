import { toRect, type Interpolator } from "flubber";
import { animate, inView } from "motion";

export default function Mask() {
  const masks = document.querySelectorAll<HTMLDivElement>("[data-mask]");

  masks.forEach((mask) => {
    if (!mask) throw new Error("No element with [data-mask]");

    const path = mask.querySelector<SVGPathElement>(":scope path");
    if (!path) throw new Error("No SVG mask path found");
    const d = path.getAttribute("d")!;
    const interpolator = toRect(d, 0, 0, 350, 300);
    inView(mask, inViewCallback(path, interpolator), {
      margin: "0px 0px -50% 0px",
    });

    function inViewCallback(path: SVGPathElement, interpolator: Interpolator) {
      return (element: Element) => {
        const svg = element.querySelector<SVGElement>(":scope svg")!;
        animate(
          svg,
          { width: "110vmax" },
          { ease: [0.6, 0, 0.2, 1], duration: 1.2 },
        );

        animate(0, 1, {
          duration: 0.7,
          delay: 0.8,
          ease: "easeInOut",
          onUpdate: (latest) => {
            const newD = interpolator(latest);
            path.setAttribute("d", newD);
          },
        });
      };
    }
  });
}
