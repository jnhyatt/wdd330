import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

async function renderCartContents() {
  const cart = getLocalStorage("so-cart") || {};
  const entries = Object.entries(cart);
  const cartItems = await Promise.all(
    entries.map(async ([id, qty]) => {
      const product = await dataSource.findProductById(id);
      return { product, qty };
    }),
  );
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const { product, qty } = item;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="${product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${qty}</p>
  <p class="cart-card__price">$${product.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
