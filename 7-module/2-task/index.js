import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
            </h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>
    `);

    const modalClose = this.elem.querySelector(".modal__close");
    modalClose.addEventListener("click", this.close);

    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        this.close();
      }
    });
  }

  open = () => {
    document.body.classList.add("is-modal-open");
    document.body.appendChild(this.elem);
  };

  setTitle(value) {
    const modalTitle = this.elem.querySelector(".modal__title");
    modalTitle.textContent = value;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector(".modal__body");
    modalBody.appendChild(node);
  }

  close = () => {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  };
}
