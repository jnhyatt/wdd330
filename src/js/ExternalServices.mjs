const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  async getData(category) {
    return (
      await convertToJson(await fetch(`${baseURL}products/search/${category}`))
    ).Result;
  }

  async findProductById(id) {
    return (await convertToJson(await fetch(`${baseURL}product/${id}`))).Result;
  }

  async checkout(order) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    return convertToJson(await fetch(`${baseURL}checkout`, options));
  }
}
