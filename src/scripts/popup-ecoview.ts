import { animate } from "motion";

export default function PopupEcoview() {
  const ecoview = document.getElementById("ecoview-popup") as HTMLElement;

  const close = document.querySelector<HTMLElement>("[data-ecoview-close]");

  if (localStorage.getItem("ecoview")) return;

  setTimeout(() => {
    animate(
      ecoview,
      { opacity: 1, pointerEvents: "all" },
      { duration: 0.45 },
    ).then(() => {
      localStorage.setItem("ecoview", "seen");
    });
  }, 3000);

  close?.addEventListener("click", () => {
    animate(ecoview, { opacity: 0, pointerEvents: "none" }, { duration: 0.45 });
  });
}
