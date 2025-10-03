import Swiper from "swiper";
import { animate, inView, stagger } from "motion";

export default function ProjectsSlider() {
  inView(
    ".swiper",
    () => {
      animate([
        ["[data-project-card]", { opacity: 1 }],
        [
          "[data-project-card] > div",
          { clipPath: "inset(0 0 0 0)" },
          { duration: 1.2, delay: stagger(0.2), ease: [0.6, 0, 0.2, 1] },
        ],
        [
          "[data-project-card] > div img",
          { scale: [1.5, 1] },
          {
            duration: 1.4,
            at: "<",
            delay: stagger(0.2),
          },
        ],
        [
          "[data-project-card] > p span",
          {
            y: [10, 0],
            opacity: [0, 1],
          },
          {
            duration: 0.5,
            at: "<",
            delay: stagger(0.2, { startDelay: 0.8 }),
          },
        ],
      ]);
    },
    { margin: "0px 0px -150px 0px" },
  );

  new Swiper(".swiper", {
    spaceBetween: 12,
    breakpoints: {
      768: {
        slidesPerView: "auto",
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
      },
    },
    slidesPerView: 1.15,
    slidesOffsetBefore: 12,
    slidesOffsetAfter: 12,
  });
}
