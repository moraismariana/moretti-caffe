import initScrollEffect from "./scroll-effect.js";
import initScrollTo from "./scroll-to.js";

export default function initGetAPICardapio() {
  /*
  Função para pegar dados da API na tela de Cardápio e na tela de Categoria
  */

  const container = document.querySelector("[data-get-api-container]");

  function armazenarTitulo(links) {
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        // event.preventDefault();

        console.log(link.innerHTML);
        sessionStorage.setItem("categoria", link.innerHTML);
      });
    });
  }

  if (container) {
    if (container.dataset.getApiContainer === "cardapio") {
      fetch("http://127.0.0.1:8000/categorias/")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            let HTMLElement = document.createElement("li");
            HTMLElement.dataset.scrollElement = "to-right";
            HTMLElement.innerHTML = `<a href="./categoria/?c=${item.id}">${item.nome}</a><img src="../static/img/svg/right-arrow.svg" alt="Seta para o lado"></img>`;
            container.appendChild(HTMLElement);
          });
          initScrollEffect();

          const links = document.querySelectorAll('[href^="./categoria/"]');
          armazenarTitulo(links);
        })
        .then(() => {
          initScrollTo();
        });
    } else if (container.dataset.getApiContainer === "categoria") {
      initScrollTo();

      if (sessionStorage.categoria) {
        let titulo = document.querySelector(
          '[data-get-api="categoria-titulo"]'
        );
        titulo.innerHTML = sessionStorage.categoria;
      }

      const params = new URLSearchParams(window.location.search);
      const URLCategoria = +params.get("c");

      fetch("http://127.0.0.1:8000/pratos/")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            if (item.categoria === URLCategoria) {
              let HTMLElement = document.createElement("div");
              HTMLElement.dataset.scrollElement = "to-right";
              HTMLElement.classList.add("cardapio-prato");
              HTMLElement.innerHTML = `
            <div class="cardapio-prato-image">
              <img src="${item.imagem}" alt="Prato">
              <div>
                <p>${item.preco}</p>
                <p>${item.nome}</p>
              </div>
            </div>
            <p>${item.descricao}</p>`;
              container.appendChild(HTMLElement);
            }
          });
          initScrollEffect();
        });
    }
  }
}
