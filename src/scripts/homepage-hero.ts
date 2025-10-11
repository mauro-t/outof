import { animate, stagger } from "motion";
import SplitType from "split-type";

export default function HomepageHero() {
  const titleWords =
    document.querySelectorAll<HTMLElement>("#title-words > div");
  const titleParagraphs = document.querySelectorAll<HTMLElement>(
    "#title-paragraphs p",
  );

  let i = 0;

  titleWords.forEach((word, i) => {
    const { chars } = new SplitType(word, { types: "chars" });
    chars?.forEach((char) => {
      char.style.opacity = "0";
      char.style.display = "inline-flex";
    });
  });

  titleParagraphs.forEach((paragraph, i) => {
    const { lines } = new SplitType(paragraph, { types: "lines" });
    lines?.forEach((line) => {
      line.style.opacity = "0";
    });
  });

  async function showWordChars() {
    const wordChars = [...titleWords[i].querySelectorAll(".char")];
    animate(
      wordChars,
      { opacity: 1 },
      { delay: stagger(0.075), duration: 0.05 },
    ).then(() => {
      animate(
        wordChars,
        { opacity: 0 },
        { delay: stagger(0.075, { startDelay: 1.2 }), duration: 0.05 },
      );
    });
  }

  async function showParagraphWords() {
    const paragraphWords = [...titleParagraphs[i].querySelectorAll(".line")];
    animate(
      paragraphWords,
      { opacity: 1, y: [10, 0] },
      { delay: stagger(0.175), duration: 0.2, ease: "easeInOut" },
    ).then(() => {
      animate(
        paragraphWords,
        { opacity: 0, y: [0, -10] },
        {
          duration: 0.2,
          ease: "easeInOut",
          delay: stagger(0.05, { startDelay: 1.2 }),
        },
      );
    });
  }

  let time;

  function loop(timestamp: number) {
    time ??= timestamp;
    if (timestamp - time >= 2000) {
      showWordChars();
      showParagraphWords();
      if (i == titleWords.length - 1) i = 0;
      else i += 1;
      time = timestamp;
    }
    requestAnimationFrame(loop);
  }
  setTimeout(() => {
    requestAnimationFrame(loop);

    showWordChars();
    showParagraphWords();
    if (i == titleWords.length - 1) i = 0;
    else i += 1;
  }, 400);
}
