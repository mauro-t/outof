// import { animate, inView, stagger } from "motion";
// import SplitType from "split-type";

// export default function Words() {
//   const w = document.querySelector<HTMLElement>("[data-words]")!;
//   const originalHTML = w.innerHTML;
//   const { words } = new SplitType(w, { types: "words" });
//   words?.forEach((word) => {
//     word.style.opacity = "0";
//     word.style.transform = "translateY(0.5em)";
//   });

//   inView(
//     w,
//     () => {
//       animate(
//         words!,
//         { y: 0, opacity: 1 },
//         { duration: 0.3, delay: stagger(0.05) },
//       ).then(() => {
//         w.innerHTML = originalHTML;
//       });
//     },
//     {
//       margin: "0px 0px -200px 0px",
//     },
//   );
// }
