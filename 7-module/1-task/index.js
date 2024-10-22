import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const navigation = this.elem.querySelector(".ribbon__inner");

    this.categories.forEach((element) => {
      const category = new ItemMenu(element);
      navigation.appendChild(category.item);
    });

    const ribbonItem = this.elem.querySelector(".ribbon__item");
    this.addClassElement(ribbonItem, "ribbon__item_active");

    this.elem.addEventListener("click", this.choiceElement);
    this.elem.addEventListener("click", this.switchElement);
  }

  choiceElement = (e) => {
    const ribbonItem = e.target.closest(".ribbon__item");

    if (ribbonItem === null) {
      return;
    }

    const ribbonActive = this.elem.querySelector(".ribbon__item_active");
    this.removeClassElement(ribbonActive, "ribbon__item_active");
    this.addClassElement(e.target, "ribbon__item_active");

    const eventRibbonSelect = new CustomEvent("ribbon-select", {
      detail: e.target.dataset.id,
      bubbles: true,
    });

    this.elem.dispatchEvent(eventRibbonSelect);
    e.preventDefault();
  };

  switchElement = (e) => {
    const arrowsMenu = e.target.closest(".ribbon__arrow");

    if (arrowsMenu === null) {
      return;
    }

    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const arrowRightMenu = this.elem.querySelector(".ribbon__arrow_right");
    const arrowLeftMenu = this.elem.querySelector(".ribbon__arrow_left");

    const isArrowRightMenu = arrowsMenu?.className.includes("right");
    const isArrowLeftMenu = arrowsMenu?.className.includes("left");

    const [scrollLeft, scrollRight] = this.getScroll(ribbonInner);
    const shiftLengthStep = 350;

    if (isArrowRightMenu) {
      this.translateElement(ribbonInner, shiftLengthStep);

      if (scrollRight + shiftLengthStep > 1) {
        this.addClassElement(arrowLeftMenu, "ribbon__arrow_visible");
      }
      if (scrollLeft - shiftLengthStep < 0) {
        this.removeClassElement(arrowRightMenu, "ribbon__arrow_visible");
      }
    } else if (isArrowLeftMenu) {
      this.translateElement(ribbonInner, -shiftLengthStep);

      if (scrollRight - shiftLengthStep < 1) {
        this.removeClassElement(arrowLeftMenu, "ribbon__arrow_visible");
      }
      if (scrollLeft + shiftLengthStep > 0) {
        this.addClassElement(arrowRightMenu, "ribbon__arrow_visible");
      }
    }
  };

  getScroll(element) {
    const scrollWidth = element.scrollWidth;
    const scrollLeft = element.scrollLeft;
    const clientWidth = element.clientWidth;

    const scrollRight = scrollWidth - scrollLeft - clientWidth;
    return [scrollLeft, scrollRight];
  }

  translateElement(element, length) {
    element.scrollBy(length, 0);
  }

  removeClassElement(element, className) {
    element.classList.remove(className);
  }

  addClassElement(element, className) {
    element.classList.add(className);
  }
}

class ItemMenu {
  constructor(category) {
    this.id = category.id;
    this.name = category.name;
    this.render();
  }

  render() {
    this.item = createElement(`
      <a
        href="#"
        class="ribbon__item"
        data-id=${this.id}
      >
        ${this.name}
      </a>
    `);
  }
}
