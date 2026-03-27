import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const productList = new ProductList(category, dataSource);

const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};
document.querySelector(".products h2").textContent =
  `Top Products: ${categoryNames[category] ?? category}`;

document
  .querySelector(".product-list")
  .append(...(await productList.renderProductList()));
