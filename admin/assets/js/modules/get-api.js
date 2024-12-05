export default function initGetAPI() {
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

            HTMLElement.dataset.listSizeItem = "";

            HTMLElement.innerHTML = `
                    <a href="./categoria/?c=${nomeAlterado}">
                        <p>${item.nome}</p>
                    </a>
                    <div>
                        <button data-modal="abrir" data-modal-type="update-categoria"><img src="../assets/img/edit.svg" alt="Editar categoria"></button>
                        <button data-modal="abrir" data-modal-type="delete-categoria"><img src="../assets/img/delete.svg" alt="Deletar categoria"></button>
                    </div>`;
            container.appendChild(HTMLElement);
          });
        })
        .catch((erro) => {
          alert(
            "Não foi possível conectar-se ao servidor. Lamentamos o transtorno."
          );
        });
    } else if (container.dataset.getApiContainer === "categoria") {
      let titulo = document.querySelector('[data-get-api="categoria-titulo"]');

      const params = new URLSearchParams(window.location.search);
      const URLCategoria = params.get("c");

      fetch("http://127.0.0.1:8000/pratos/")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.forEach((item) => {
            const nomeAlterado = item.categoria
              .toLowerCase()
              .replace(/[ ]+/g, "-");
            if (nomeAlterado === URLCategoria) {
              titulo.innerHTML = item.categoria;

              let HTMLElement = document.createElement("li");

              HTMLElement.dataset.listSizeItem = "";
              HTMLElement.classList.add("cardapio-prato");
              HTMLElement.innerHTML = `
                    <div>
                        <h3>${item.nome}<span>${item.preco}</span></h3>
                        <p>${item.descricao}</p>
                    </div>
                    <div>
                        <button data-modal="abrir" data-modal-type="update-prato"><img src="../../assets/img/edit.svg" alt="Editar prato"></button>
                        <button data-modal="abrir" data-modal-type="delete-prato"><img src="../../assets/img/delete.svg" alt="Deletar prato"></button>
                    </div>`;
              container.appendChild(HTMLElement);
            }
          });
        })
        .catch((erro) => {
          alert(
            "Não foi possível conectar-se ao servidor. Lamentamos o transtorno."
          );
        });
    }
  }
}
