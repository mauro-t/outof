import { animate, inView, stagger } from "motion";

const elements = document.querySelectorAll<HTMLElement>(
  "[data-animation='by-line']",
);

export function splitText(element: HTMLElement) {
  const content = element.innerText;
  const words = content.split(" ");
  const lines: string[] = [];
  element.innerHTML = words.map((word) => `<span>${word}</span>`).join(" ");
  const spans = element.querySelectorAll<HTMLSpanElement>("span");
  let prevTop: number | undefined = undefined;
  let line: string[] = [];
  spans.forEach((span) => {
    const top = span.getBoundingClientRect().top;
    prevTop ??= top;
    if (top == prevTop) {
      line.push(span.innerText);
    } else {
      lines.push(line.join(" "));
      line = [span.innerText];
      prevTop = top;
    }
  });
  lines.push(line.join(" "));
  // element.innerHTML = "";
  return lines;
}

export function createLineElements(parent: HTMLElement, lines: string[]) {
  return lines.map((line) => {
    const div = document.createElement("span");
    div.className = "overflow-hidden block";
    const animated = document.createElement("span");
    animated.className = "block";
    animated.style.transform = "translateY(100%)";
    animated.innerText = line;
    div.append(animated);
    parent.append(div);
    return animated;
  });
}

elements.forEach((el) => {
  el.classList.add("invisible");

  inView(
    el,
    () => {
      el.classList.remove("invisible");
      const lines = createLineElements(el, splitText(el));
      const rect = el.getBoundingClientRect();
      const animation = animate(
        lines,
        {
          y: 0,
        },
        {
          delay: stagger(0.15),
          duration: 0.32,
        },
      );
      function endAnimation() {
        const newRect = el.getBoundingClientRect();
        if (newRect.width != rect.width) animation.complete();
      }

      window.addEventListener("resize", endAnimation);

      animation.then(() => {
        window.removeEventListener("resize", endAnimation);
        el.innerHTML = el.innerText;
      });
    },
    {
      margin: "0px 0px -200px 0px",
    },
  );
});
