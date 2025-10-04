import { animate, inView, stagger } from "motion";
import SplitType from "split-type";
import { debounce } from "lodash";

export default function animateText() {
  const elements = document.querySelectorAll<HTMLElement>("[data-text]");
  elements.forEach((element) => {
    const textType = element.dataset.text;
    const originalHTML = element.innerHTML;
    const text = new SplitType(element, { types: "lines" });
    let animated = false;
    let w: number | undefined = undefined;
    const resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        w ??= entry.contentRect.width;
        if (w != entry.contentRect.width && !animated) {
          text.split({ types: "lines" });
          w = entry.contentRect.width;
        }
      }, 500),
    );
    resizeObserver.observe(element);

    inView(
      element,
      () => {
        const animationKeyframes =
          textType == "title"
            ? { y: ["100%", 0] }
            : { y: ["0.5em", 0], opacity: [0, 1] };
        const duration = textType == "title" ? 0.6 : 0.75;

        animate(element.querySelectorAll(".line"), animationKeyframes, {
          duration,
          delay: stagger(0.13),
          ease: "easeOut",
        }).then(() => {
          element.classList.remove("overflow-hidden");
          element.innerHTML = originalHTML;
          animated = true;
        });
        setTimeout(() => {
          element.style.opacity = "1";
        }, 50);
      },
      {
        margin: "0px 0px -200px 0px",
      },
    );
  });
}
