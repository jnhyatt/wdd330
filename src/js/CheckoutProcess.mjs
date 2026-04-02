import { getLocalStorage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  return items.map(({ product, qty }) => ({
    id: product.Id,
    name: product.Name,
    price: product.FinalPrice,
    quantity: qty,
  }));
}

export default class CheckoutProcess {
  constructor() {
    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.cartItems = [];
  }

  async calculateItemSubtotal() {
    const cart = getLocalStorage("so-cart") || {};
    const entries = Object.entries(cart);

    if (entries.length === 0) {
      document.querySelector("#summary-subtotal").textContent = "$0.00";
      return;
    }

    const dataSource = new ExternalServices();
    this.cartItems = await Promise.all(
      entries.map(async ([id, qty]) => {
        const product = await dataSource.findProductById(id);
        return { product, qty };
      }),
    );

    this.itemTotal = this.cartItems.reduce(
      (sum, { product, qty }) => sum + product.FinalPrice * qty,
      0,
    );
    document.querySelector("#summary-subtotal").textContent =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const taxRate = 0.06;
    this.tax = this.itemTotal * taxRate;

    if (this.itemTotal < 50) {
      this.shipping = 10;
    } else if (this.itemTotal < 100) {
      this.shipping = 15;
    } else {
      this.shipping = 20;
    }

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    document.querySelector("#summary-tax").textContent =
      `$${this.tax.toFixed(2)}`;
    document.querySelector("#summary-shipping").textContent =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector("#summary-total").textContent =
      `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    // get the form element data by the form name
    const order = formDataToJSON(form);
    // populate the order object with computed values
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.cartItems);
    // rename form fields to match server schema
    order.expiration = order.expDate;
    delete order.expDate;
    order.code = order.securityCode;
    delete order.securityCode;
    // call the checkout method in ExternalServices and send the order data
    const services = new ExternalServices();
    return await services.checkout(order);
  }
}
