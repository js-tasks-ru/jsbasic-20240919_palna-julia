import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render(this.products);
  }

  render(list) {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    const productsList = this.elem.querySelector(".products-grid__inner");

    list.forEach((element) => {
      const product = new ProductCard(element);
      productsList.appendChild(product.elem);
    });
  }

  updateFilter(filters) {
    let listFilterProducts = this.products;
    Object.assign(this.filters, filters);

    for (let filter in this.filters) {
      listFilterProducts = listFilterProducts.filter((product) => {
        if (filter === "vegeterianOnly") {
          this.resetFilter(this.filters[filter], product);
          return this.isVegeterianOnly(product);
        }

        if (filter === "noNuts") {
          this.resetFilter(this.filters[filter], product);
          return this.isNonNuts(product);
        }

        if (filter === "maxSpiciness") {
          return this.isSpaciness(product, this.filters[filter]);
        }

        if (filter === "category") {
          return this.isCategory(product, this.filters[filter]);
        }
      });
    }

    this.render(listFilterProducts);
  }

  resetFilter(value, product) {
    if (value === false) {
      return product;
    }
  }

  isNonNuts(product) {
    return product.nuts === false || product.nuts === undefined;
  }

  isVegeterianOnly(product) {
    return product.vegeterian;
  }

  isSpaciness(product, value) {
    return product.spiciness <= value;
  }

  isCategory(product, value) {
    const isEmpty = product.category === "" || product.category === undefined;

    if (isEmpty) {
      return product;
    }

    return product.category === value;
  }
}
