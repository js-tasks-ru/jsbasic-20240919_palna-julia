import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetHeight) {
      return;
    }

    const isMobile = document.documentElement.clientWidth <= 767;

    if (isMobile) {
      this.initialPosition();
      return;
    }

    if (this.initialTopCoord === undefined) {
      this.initialTopCoord =
        this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    if (window.pageYOffset > this.initialTopCoord) {
      this.fixidPosition();
    } else {
      this.initialPosition();
    }
  }

  fixidPosition() {
    const container = document.querySelector(".container");
    const widtElement = document.documentElement.clientWidth;
    const identFirst = container.getBoundingClientRect().right + 20;
    const identSecond = widtElement - this.elem.offsetWidth - 10;
    const leftIndent = Math.min(identFirst, identSecond);

    Object.assign(this.elem.style, {
      position: "fixed",
      top: "50px",
      zIndex: 1e3,
      right: "10px",
      left: `${leftIndent}px`,
    });
  }

  initialPosition() {
    Object.assign(this.elem.style, {
      position: "",
      top: "",
      left: "",
      zIndex: "",
    });
  }
}
