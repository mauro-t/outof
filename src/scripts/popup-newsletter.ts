import { animate } from "motion";

export default function PopupNewsletter() {
  const newsletter = document.getElementById("newsletter-popup") as HTMLElement;
  const trigger = document.querySelector<HTMLElement>(
    "[data-newsletter-trigger]",
  );
  const close = document.querySelector<HTMLElement>("[data-newsletter-close]");

  trigger?.addEventListener("click", () => {
    animate(
      newsletter,
      { opacity: 1, pointerEvents: "all" },
      { duration: 0.45 },
    );
  });

  close?.addEventListener("click", () => {
    animate(
      newsletter,
      { opacity: 0, pointerEvents: "none" },
      { duration: 0.45 },
    );
  });
}
