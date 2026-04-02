import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import alertMessage from "./alert.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
    }

    async addToCart() {
        const cart = getLocalStorage("so-cart") || {};
        cart[this.productId] = (cart[this.productId] || 0) + 1;
        setLocalStorage("so-cart", cart);
        alertMessage("Item added to cart");
    }

    async renderProductDetails() {
        const product = await this.dataSource.findProductById(this.productId);
        const template = document.getElementById("product-detail-template");
        const result = template.content.cloneNode(true);
        result.querySelector("h3").textContent = product.Brand.Name;
        result.querySelector("h2").textContent = product.NameWithoutBrand;
        const img = result.querySelector("img");
        img.src = product.Images.PrimaryLarge;
        img.alt = product.Name;
        result.querySelector(".product-card__price").textContent = `$${product.ListPrice}`;
        result.querySelector(".product__color").textContent = product.Colors[0].ColorName;
        result.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
        result.querySelector("#addToCart").dataset.id = product.Id;
        return result;
    }
}