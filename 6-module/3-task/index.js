import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.count = 0;
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner"></div>
      </div>
    `);

    const carouselInner = this.elem.querySelector(".carousel__inner");
    const carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");

    this.slides.forEach((item) => {
      const slider = new CarouselSlide(item);
      carouselInner.appendChild(slider.slider);
    });

    if (this.count === 0) {
      this.hiddenElement(carouselArrowLeft);
    }

    this.elem.addEventListener("click", this.switchSlide);
    this.elem.addEventListener("click", this.addEvent);
  }

  addEvent = (e) => {
    const carouselButton = e.target.closest(".carousel__button");

    if (carouselButton === null) {
      return;
    }

    const carouselSlide = e.target.closest(".carousel__slide");

    const eventProductAdd = new CustomEvent("product-add", {
      detail: carouselSlide.dataset.id,
      bubbles: true,
    });

    this.elem.dispatchEvent(eventProductAdd);
  };

  switchSlide = (e) => {
    const carouselArrow = e.target.closest(".carousel__arrow");

    if (carouselArrow === null) {
      return;
    }

    const carouselInner = this.elem.querySelector(".carousel__inner");
    const carouselArrowRight = this.elem.querySelector(
      ".carousel__arrow_right"
    );
    const carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");

    const isCarouselArrowRight = carouselArrow?.className.includes("right");
    const isCarouselArrowLeft = carouselArrow?.className.includes("left");

    const slidersNumbers = this.slides.length;
    const width = carouselInner.offsetWidth;

    if (isCarouselArrowRight) {
      this.count = this.reciveCountRight(this.count, slidersNumbers);

      if (this.count === 1) {
        this.showElement(carouselArrowLeft);
      }

      if (this.count === slidersNumbers - 1) {
        this.hiddenElement(carouselArrowRight);
      }
    } else if (isCarouselArrowLeft) {
      this.count = this.reciveCountLeft(this.count);

      if (this.count === slidersNumbers - 2) {
        this.showElement(carouselArrowRight);
      }

      if (this.count === 0) {
        this.hiddenElement(carouselArrowLeft);
      }
    }

    const length = this.count * width;
    this.translateElement(carouselInner, length);
  };

  reciveCountRight(count, length) {
    return count < length - 1 ? ++count : length - 1;
  }

  reciveCountLeft(count) {
    return count > 0 ? --count : 0;
  }

  showElement(element) {
    element.style.display = "";
  }

  hiddenElement(element) {
    element.style.display = "none";
  }

  translateElement(element, length) {
    element.style.transform = `translateX(-${length}px)`;
  }
}

class CarouselSlide {
  constructor(slider) {
    this.name = slider.name;
    this.price = slider.price;
    this.image = slider.image;
    this.id = slider.id;

    this.render();
  }

  render() {
    this.slider = createElement(`
      <div class="carousel__slide" data-id=${this.id}>
        <img src=${this.getPathImage()}
          class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${this.getPrice()}</span>
          <div class="carousel__title">${this.name}</div>

          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  getPrice = () => {
    return this.price.toFixed(2);
  };

  getPathImage = () => {
    return `/assets/images/carousel/${this.image}`;
  };
}
