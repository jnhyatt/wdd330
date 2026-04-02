import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

document
  .querySelector(".product-detail")
  .appendChild(await product.renderProductDetails());
document
  .getElementById("addToCart")
  .addEventListener("click", async () => await product.addToCart());
