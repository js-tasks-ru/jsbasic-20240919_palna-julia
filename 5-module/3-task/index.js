function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const sliders = carousel.querySelectorAll(".carousel__slide");
  const carouselInner = carousel.querySelector(".carousel__inner");
  const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");

  const width = carousel.offsetWidth;
  const slidersNumbers = sliders.length;

  let count = 0;

  if (count === 0) {
    hidden(carouselArrowLeft);
  }

  carousel.addEventListener("click", switchSlide);

  function switchSlide(e) {
    const carouselArrow = e.target.closest(".carousel__arrow");

    const isCarouselArrowRight = carouselArrow?.className.includes("right");
    const isCarouselArrowLeft = carouselArrow?.className.includes("left");

    if (isCarouselArrowRight) {
      count = reciveCountRight(count, slidersNumbers);
      const length = count * width;
      translateRight(carouselInner, length);

      if (count === 1) {
        show(carouselArrowLeft);
      }

      if (count === slidersNumbers - 1) {
        hidden(carouselArrowRight);
      }
    } else if (isCarouselArrowLeft) {
      count = reciveCountLeft(count);
      const length = count * width;

      translateLeft(carouselInner, length);

      if (count === slidersNumbers - 2) {
        show(carouselArrowRight);
      }

      if (count === 0) {
        hidden(carouselArrowLeft);
      }
    }
  }
}

function reciveCountRight(count, length) {
  return count < length - 1 ? ++count : length - 1;
}

function reciveCountLeft(count) {
  return count > 0 ? --count : 0;
}

function show(element) {
  element.style.display = "";
}

function hidden(element) {
  element.style.display = "none";
}

function translateRight(element, length) {
  element.style.transform = `translateX(-${length}px)`;
}

function translateLeft(element, length) {
  element.style.transform = `translateX(-${length}px)`;
}
