import { animate } from "motion";
const titleWords = document.getElementById("title-words") as HTMLElement;
const titleParagraphs = document.querySelectorAll<HTMLElement>(
  "#title-paragraphs p",
);

let i = 1;

setInterval(() => {
  animate([
    [titleWords, { y: `-${i * 100}%` }, { duration: 0.4 }],
    [titleParagraphs[i - 1], { opacity: 0 }, { at: "<" }],
    [titleParagraphs[i], { opacity: 1 }, { at: "<" }],
  ]).then(() => {
    if (i == 6) {
      animate(titleWords, { y: 0 }, { duration: 0 });
      animate(titleParagraphs[0], { opacity: 1 }, { duration: 0 });
      animate(titleParagraphs[i], { opacity: 0 }, { duration: 0 });
      i = 1;
    } else {
      i++;
    }
  });
}, 3000);
