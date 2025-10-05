import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

export function initSwipers() {
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

  new Swiper(".swiper-fullscreen", {
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

  new Swiper(".swiper-project-block", {
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
}
