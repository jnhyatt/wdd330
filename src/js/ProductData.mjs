const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  async getData(category) {
    return (await convertToJson((await fetch(`${baseURL}products/search/${category}`)))).Result;
  }

  async findProductById(id) {
    return (await convertToJson(await fetch(`${baseURL}product/${id}`))).Result;
  }
}
