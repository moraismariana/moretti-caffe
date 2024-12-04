import initScrollEffect from "./scroll-effect.js";

export default function initGetAPICardapio() {
  /*
  Função para pegar dados da API na tela de Cardápio e na tela de Categoria
  */

  const container = document.querySelector("[data-get-api-container]");

  if (container) {
    if (container.dataset.getApiContainer === "cardapio") {
      fetch("http://127.0.0.1:8000/categorias/")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            let nomeAlterado = item.nome.toLowerCase().replace(/[ ]+/g, "-");
            let HTMLElement = document.createElement("li");
            HTMLElement.dataset.scrollElement = "to-right";
            HTMLElement.innerHTML = `<a href="./categoria/?c=${nomeAlterado}">${item.nome}</a><img src="../static/img/svg/right-arrow.svg" alt="Seta para o lado"></img>`;
            container.appendChild(HTMLElement);
          });
          initScrollEffect();
        });
    } else if (container.dataset.getApiContainer === "categoria") {
      let titulo = document.querySelector('[data-get-api="categoria-titulo"]');

      const params = new URLSearchParams(window.location.search);
      const URLCategoria = params.get("c");

      fetch("http://127.0.0.1:8000/pratos/")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            const nomeAlterado = item.categoria
              .toLowerCase()
              .replace(/[ ]+/g, "-");
            if (nomeAlterado === URLCategoria) {
              titulo.innerHTML = item.categoria;
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
