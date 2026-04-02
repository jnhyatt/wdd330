export default function alertMessage(message, scroll = true) {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert");
  alertEl.innerHTML = `<p>${message}</p><span class="alert__close">X</span>`;
  alertEl.querySelector(".alert__close").addEventListener("click", () => alertEl.remove());
  document.querySelector("header").insertAdjacentElement("afterend", alertEl);
  if (scroll) window.scrollTo(0, 0);
}
