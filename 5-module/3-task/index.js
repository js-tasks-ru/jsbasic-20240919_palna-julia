function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const sliders = carousel.querySelectorAll(".carousel__slide");
  const carouselInner = carousel.querySelector(".carousel__inner");
  const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");

  const slidersNumbers = sliders.length;

  let count = 0;

  if (count === 0) {
    hiddenElement(carouselArrowLeft);
  }

  carousel.addEventListener("click", switchSlide);

  function switchSlide(e) {
    const carouselArrow = e.target.closest(".carousel__arrow");

    const isCarouselArrowRight = carouselArrow?.className.includes("right");
    const isCarouselArrowLeft = carouselArrow?.className.includes("left");

    const width = carouselInner.offsetWidth;

    if (isCarouselArrowRight) {
      count = reciveCountRight(count, slidersNumbers);

      if (count === 1) {
        showElement(carouselArrowLeft);
      }

      if (count === slidersNumbers - 1) {
        hiddenElement(carouselArrowRight);
      }
    } else if (isCarouselArrowLeft) {
      count = reciveCountLeft(count);

      if (count === slidersNumbers - 2) {
        showElement(carouselArrowRight);
      }

      if (count === 0) {
        hiddenElement(carouselArrowLeft);
      }
    }

    const length = count * width;
    translateElement(carouselInner, length);
  }
}

function reciveCountRight(count, length) {
  return count < length - 1 ? ++count : length - 1;
}

function reciveCountLeft(count) {
  return count > 0 ? --count : 0;
}

function showElement(element) {
  element.style.display = "";
}

function hiddenElement(element) {
  element.style.display = "none";
}

function translateElement(element, length) {
  element.style.transform = `translateX(-${length}px)`;
}
