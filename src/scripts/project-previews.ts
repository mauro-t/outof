import { animate } from "motion";

export default function ProjectPreviews() {
  const rotations = [-24, -12, -6, 6, 12, 24];

  const p = document.querySelectorAll<HTMLDivElement>("[data-project-preview]");

  p.forEach((preview) => {
    const img = preview.querySelector<HTMLImageElement>(":scope img");

    preview.addEventListener("mouseenter", ({ clientX }) => {
      if (!img) return;
      img.style.left = clientX + "px";
      img.style.rotate =
        rotations[Math.floor(Math.random() * rotations.length - 1)] + "deg";
      animate(img, { opacity: 100 }, { duration: 0.35 });
    });

    preview.addEventListener("mousemove", ({ clientX }) => {
      if (!img) return;
      animate(img, { left: clientX }, { type: "spring", stiffness: 45 });
    });

    preview.addEventListener("mouseleave", () => {
      if (!img) return;
      animate(img, { opacity: 0 }, { duration: 0.55 });
    });
  });
}
