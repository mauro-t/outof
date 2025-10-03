import Swiper from "swiper";

export function initSwiper() {
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
