import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    let indexEqualProduct = -1;

    if (product === null || product === undefined) {
      return;
    }

    if (this.cartItems.length === 0) {
      this.pushNewProduct(this.cartItems, product);
      this.onProductUpdate(this.cartItems);
      return;
    }

    indexEqualProduct = this.cartItems.findIndex((card) => {
      const isEqual = Object.keys({ ...card.product, ...product }).every(
        (key) => {
          return card.product[key] === product[key];
        }
      );

      return isEqual;
    });

    if (indexEqualProduct === -1) {
      this.pushNewProduct(this.cartItems, product);
    } else {
      this.cartItems[indexEqualProduct].count++;
    }

    this.onProductUpdate(this.cartItems);
  }

  pushNewProduct(array, product) {
    array.push({
      product: product,
      count: 1,
    });
  }

  updateProductCount(productId, amount) {
    const indexProduct = this.cartItems.findIndex((card) => {
      return card.product.id === productId;
    });

    if (indexProduct === -1) {
      return;
    }

    this.cartItems[indexProduct].count += amount;

    if (this.cartItems[indexProduct].count === 0) {
      this.cartItems = this.cartItems.filter((item) => item.count !== 0);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((accumulator, item) => {
      return (accumulator += item.count);
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((accumulator, item) => {
      return (accumulator += item.count * item.product.price);
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}
            </span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    const orderForm = this.renderOrderForm();
    const modalBody = createElement(`<div></div>`);

    this.cartItems.forEach((item) => {
      const product = this.renderProduct(item.product, item.count);
      modalBody.appendChild(product);
    });

    modalBody.appendChild(orderForm);

    this.modal.setTitle("Your order");
    this.modal.setBody(modalBody);
    this.modal.open();

    modalBody.addEventListener("click", this.onCountUpdate);
    orderForm.addEventListener("submit", this.onSubmit);
  }

  onCountUpdate = (e) => {
    const button = e.target.closest(".cart-counter__button");

    if (!button) {
      return;
    }
    const cartProduct = e.target.closest(".cart-product");
    const cartProductId = cartProduct.dataset.productId;
    const isButtonMinus = button.className.includes("minus");

    if (isButtonMinus) {
      const curentProduct = this.cartItems.find((item) => {
        return item.product.id === cartProductId;
      });

      if (curentProduct.count === 1) {
        cartProduct.remove();
      }

      this.updateProductCount(cartProductId, -1);
    } else {
      this.updateProductCount(cartProductId, 1);
    }
  };

  onProductUpdate = (cartItem) => {
    const isOpen = document.body.className.includes("is-modal-open");

    if (isOpen) {
      cartItem.forEach((item) => {
        if (item.count === 0) {
          item.remove();
          return;
        }

        const productId = item.product.id;
        const productCount = this.modal.elem.querySelector(
          `[data-product-id="${productId}"] .cart-counter__count`
        );
        const productPrice = this.modal.elem.querySelector(
          `[data-product-id="${productId}"] .cart-product__price`
        );
        const infoPrice = this.modal.elem.querySelector(
          `.cart-buttons__info-price`
        );

        productCount.innerHTML = item.count;
        productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(
          2
        )}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      });

      if (cartItem.length === 0) {
        document.body.classList.remove("is-modal-open");
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const buttonSubmit = e.submitter;
    let formData;
    let modalSuccess;
    let modalBody;

    if (!buttonSubmit) {
      return;
    }

    buttonSubmit.classList.add("is-loading");
    formData = new FormData(e.target, buttonSubmit);

    modalSuccess = createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred!");
      }

      modalBody = this.modal.elem.querySelector(".modal__body");
      modalBody.innerHTML = "";
      this.modal.setTitle("Success!");
      this.modal.setBody(modalSuccess);

      this.cartItems = [];
      buttonSubmit.classList.remove("is-loading");
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
