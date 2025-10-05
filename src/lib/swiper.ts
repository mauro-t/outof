import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { inView } from "motion";

export function initSwipers() {
  const base = document.querySelectorAll<HTMLElement>(".swiper");

  base.forEach((el) => {
    const swiper = new Swiper(el, {
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

    inView(
      el,
      () => {
        setTimeout(() => {
          swiper.slideNext(2000);
        }, 2000);
      },
      { margin: "0px 0px -300px 0px" },
    );
  });

  const fullscreen =
    document.querySelectorAll<HTMLElement>(".swiper-fullscreen");

  fullscreen.forEach((el) => {
    new Swiper(el, {
      modules: [Pagination, Autoplay],
      breakpoints: {
        768: {
          slidesOffsetBefore: 20,
        },
      },
      slidesOffsetBefore: 12,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        bulletClass: "size-2 bg-white rounded-full inline-block",
        bulletActiveClass: "size-4 !bg-accent",
        clickable: true,
      },
    });
  });

  const imagesBlock = document.querySelectorAll<HTMLElement>(
    ".swiper-project-block",
  );

  imagesBlock.forEach((el) => {
    new Swiper(el, {
      spaceBetween: 12,
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
        },
      },
      slidesPerView: 1.15,
      slidesOffsetBefore: 12,
      slidesOffsetAfter: 12,
    });
  });
}
