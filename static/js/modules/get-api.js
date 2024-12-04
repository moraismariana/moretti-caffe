import initScrollEffect from "./scroll-effect.js";

export default function initGetAPI() {}

const container = document.querySelector("[data-get-api]");

if (container) {
  if ((container.dataset.getApi = "cardapio")) {
    let element = document.createElement("li");
    element.dataset.scrollElement = "to-right";
    element.innerHTML = `<a href="./x/">Entradas</a><img src="../static/img/svg/right-arrow.svg" alt="Seta para o lado"></img>`;

    fetch("http://127.0.0.1:8000/categorias/")
      .then((response) => response.json())
      .then((data) => {
        console.log("api");
        data.forEach((item) => {
          let HTMLElement = document.createElement("li");
          HTMLElement.dataset.scrollElement = "to-right";
          HTMLElement.innerHTML = `<a href="./x/">${item.nome}</a><img src="../static/img/svg/right-arrow.svg" alt="Seta para o lado"></img>`;
          container.appendChild(HTMLElement);
        });
        initScrollEffect();
      });
  }
}
