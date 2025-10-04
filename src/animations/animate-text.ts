import { animate, inView, stagger } from "motion";
import SplitType from "split-type";

export default function animateText() {
  const elements = document.querySelectorAll<HTMLElement>("[data-text]");
  elements.forEach((element) => {
    const textType = element.dataset.text;
    const originalHTML = element.innerHTML;
    const { lines } = new SplitType(element, { types: "lines" });

    inView(
      element,
      () => {
        const animationKeyframes =
          textType == "title"
            ? { y: ["100%", 0] }
            : { y: ["0.5em", 0], opacity: [0, 1] };
        const duration = textType == "title" ? 0.6 : 0.75;
        if (lines) {
          animate(lines, animationKeyframes, {
            duration,
            delay: stagger(0.13),
            ease: "easeOut",
          }).then(() => {
            element.classList.remove("overflow-hidden");
            element.innerHTML = originalHTML;
          });
          setTimeout(() => {
            element.style.opacity = "1";
          }, 50);
        }
      },
      {
        margin: "0px 0px -200px 0px",
      },
    );
  });
}
