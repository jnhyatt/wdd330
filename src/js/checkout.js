import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess();

await checkout.calculateItemSubtotal();

// If zip is already filled (e.g. browser autofill), calculate immediately
const zipInput = document.querySelector("#zip");
if (zipInput.value.length >= 5) {
  checkout.calculateOrderTotal();
}

zipInput.addEventListener("input", (e) => {
  if (e.target.value.length >= 5) {
    checkout.calculateOrderTotal();
  }
});

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await checkout.checkout(e.target);
      // eslint-disable-next-line no-console
      console.log("Order placed:", response);
      alert("Order placed successfully!");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Checkout failed:", err);
      alert("There was a problem placing your order. Please try again.");
    }
  });
