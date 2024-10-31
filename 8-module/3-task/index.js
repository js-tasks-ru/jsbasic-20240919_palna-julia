export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      return (card.product.id = productId);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
