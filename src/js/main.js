import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category") || "tents";

const dataSource = new ExternalServices();
const productList = new ProductList(category, dataSource);

document
  .querySelector(".product-list")
  .append(...(await productList.renderProductList()));
