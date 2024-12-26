import initModal from "./modal.js";
import initListSizeStyle from "./list-size-style.js";

export default function initGetObjectsAPI() {
  /*
  Função para pegar dados da API na tela de Cardápio e na tela de Categoria
  */

  const container = document.querySelector("[data-get-api-container]");

  function armazenarTitulo(links) {
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        // event.preventDefault();

        console.log(link.innerText);
        sessionStorage.setItem("categoria", link.innerText);
      });
    });
  }

  if (container) {
    if (
      container.dataset.getApiContainer === "cardapio" &&
      !(document.body.id === "cms")
    ) {
      fetch("http://127.0.0.1:8000/categorias/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.forEach((item) => {
            let HTMLElement = document.createElement("li");

            HTMLElement.dataset.listSizeItem = "";

            HTMLElement.innerHTML = `
                    <a href="./categoria/?c=${item.id}">
                        <p>${item.nome}</p>
                    </a>
                    <div>
                        <button data-categoria-id="${item.id}" data-categoria-nome="${item.nome}" data-modal="abrir" data-modal-type="update-categoria"><img src="../assets/img/edit.svg" alt="Editar categoria"></button>
                        <button data-categoria-id="${item.id}" data-categoria-nome="${item.nome}" data-modal="abrir" data-modal-type="delete-categoria"><img src="../assets/img/delete.svg" alt="Deletar categoria"></button>
                    </div>`;
            container.appendChild(HTMLElement);
          });
        })
        .then(() => {
          initModal();
          initListSizeStyle();
          document.body.classList.add("visible");
          const links = document.querySelectorAll('[href^="./categoria/"]');
          armazenarTitulo(links);
        })
        .catch(() => {
          alert(
            "Não foi possível conectar-se ao servidor. Lamentamos o transtorno."
          );
        });
    } else if (container.dataset.getApiContainer === "categoria") {
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
              let HTMLElement = document.createElement("li");

              HTMLElement.dataset.listSizeItem = "";
              HTMLElement.classList.add("cardapio-prato");
              HTMLElement.innerHTML = `
                    <div class="categoria-item-conteudo">
                        <img src="${item.imagem}" alt="Prato">
                        <div>
                            <h3>${item.nome}<span>${item.preco}</span></h3>
                            <p>${item.descricao}</p>
                        </div>
                    </div>
                    <div>
                        <button data-categoria-id="${URLCategoria}" data-prato-id="${item.id}" data-prato-nome="${item.nome}" data-prato-preco="${item.preco}" data-prato-desc="${item.descricao}" data-prato-imagem="${item.imagem}" data-modal="abrir" data-modal-type="update-prato"><img src="../../assets/img/edit.svg" alt="Editar prato"></button>
                        <button data-categoria-id="${URLCategoria}" data-prato-id="${item.id}" data-prato-nome="${item.nome}" data-modal="abrir" data-modal-type="delete-prato"><img src="../../assets/img/delete.svg" alt="Deletar prato"></button>
                    </div>`;
              container.appendChild(HTMLElement);
            }
          });
        })
        .then(() => {
          initModal();
          initListSizeStyle();
          document.body.classList.add("visible");
        })
        .catch((erro) => {
          alert(
            "Não foi possível conectar-se ao servidor. Lamentamos o transtorno."
          );
        });
    }
  }
}
