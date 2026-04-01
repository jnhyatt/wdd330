export default class ProductList {
    constructor(category, dataSource) {
        this.category = category;
        this.dataSource = dataSource;
    }

    async renderProductList() {
        const products = await this.dataSource.getData(this.category);
        const template = document.getElementById("product-card-template");
        return products.map((product) => {
            const result = template.content.cloneNode(true);
            result.querySelector("a").href = `/product_pages/?product=${product.Id}`;
            const img = result.querySelector("img");
            img.src = product.Images.PrimaryLarge;
            img.alt = product.Name;
            result.querySelector(".card__brand").textContent = product.Brand.Name;
            result.querySelector(".card__name").textContent =
                product.NameWithoutBrand;
            result.querySelector(".product-card__price").textContent = `$${product.ListPrice}`;
            return result;
        });
    }
}