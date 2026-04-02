import CheckoutProcess from "./CheckoutProcess.mjs";
import alertMessage from "./alert.mjs";

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
    document.querySelectorAll(".alert").forEach((el) => el.remove());
    try {
      const response = await checkout.checkout(e.target);
      // eslint-disable-next-line no-console
      console.log("Order placed:", response);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Checkout failed:", err);
      if (err.name === "servicesError") {
        Object.values(err.message).forEach((msg) => alertMessage(msg));
      } else {
        alertMessage("There was a problem placing your order. Please try again.");
      }
    }
  });
