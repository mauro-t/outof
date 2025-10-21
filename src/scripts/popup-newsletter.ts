import { animate } from "motion";

export default function PopupNewsletter() {
  const newsletter = document.getElementById("newsletter-popup") as HTMLElement;
  const triggers = document.querySelectorAll<HTMLElement>(
    "[data-newsletter-trigger]",
  );
  const close = document.querySelector<HTMLElement>("[data-newsletter-close]");

  triggers.forEach((trigger) =>
    trigger.addEventListener("click", async () => {
      //@ts-ignore
      window.lenis.stop();

      await animate(
        newsletter,
        { opacity: 1, pointerEvents: "all" },
        { duration: 0.45 },
      ).finished;
    }),
  );

  newsletter.addEventListener("click", (e) => {
    if (
      e.target instanceof Node &&
      newsletter.firstElementChild?.contains(e.target)
    )
      return;
    //@ts-ignore
    window.lenis.start();
    animate(
      newsletter,
      { opacity: 0, pointerEvents: "none" },
      { duration: 0.45 },
    );
  });

  close?.addEventListener("click", () => {
    //@ts-ignore
    window.lenis.start();
    animate(
      newsletter,
      { opacity: 0, pointerEvents: "none" },
      { duration: 0.45 },
    );
  });
}
