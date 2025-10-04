import { animate, inView, stagger } from "motion";

export default function ProjectsGrid() {
  const rows = document.querySelectorAll<HTMLElement>(".row");
  rows.forEach((row) => {
    const cards = row.querySelectorAll<HTMLElement>(
      ":scope [data-project-card]",
    );

    const imgWrappers = row.querySelectorAll<HTMLElement>(
      ":scope [data-project-card] > div",
    );

    const imgs = row.querySelectorAll<HTMLElement>(
      ":scope [data-project-card] > div img",
    );

    const descs = row.querySelectorAll<HTMLElement>(
      ":scope [data-project-card] > p span",
    );

    inView(
      row,
      () => {
        animate([
          [cards, { opacity: 1 }],
          [
            imgWrappers,
            { clipPath: "inset(0 0 0 0)" },
            { duration: 1.2, delay: stagger(0.2), ease: [0.6, 0, 0.2, 1] },
          ],
          [
            imgs,
            { scale: [1.5, 1] },
            {
              duration: 1.4,
              at: "<",
              delay: stagger(0.2),
            },
          ],
          [
            descs,
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
  });
}
