import { animate } from "motion";

export default function PopupNewsletter() {
  const newsletter = document.getElementById("newsletter-popup") as HTMLElement;
  const triggers = document.querySelectorAll<HTMLElement>(
    "[data-newsletter-trigger]",
  );
  const close = document.querySelector<HTMLElement>("[data-newsletter-close]");

  triggers.forEach((trigger) =>
    trigger.addEventListener("click", () => {
      animate(
        newsletter,
        { opacity: 1, pointerEvents: "all" },
        { duration: 0.45 },
      );
    }),
  );

  close?.addEventListener("click", () => {
    animate(
      newsletter,
      { opacity: 0, pointerEvents: "none" },
      { duration: 0.45 },
    );
  });
}
