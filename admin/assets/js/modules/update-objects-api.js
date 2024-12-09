import refreshToken from "./refresh-token.js";

export default function initUpdateObjectsAPI() {
  const categoriaFormulario = document.getElementById("update-categoria");
  const pratoFormulario = document.getElementById("update-prato");

  if (categoriaFormulario) {
    categoriaFormulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const novoNomeCategoria = document.getElementById(
        "update-categoria-nome"
      ).value;

      const token = localStorage.getItem("accessToken");

      const params = new URLSearchParams(window.location.search);
      const idCategoria = params.get("c");

      const body = JSON.stringify({
        id: idCategoria,
        nome: novoNomeCategoria,
      });

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      };

      function atualizarCategoria() {
        fetch(`http://127.0.0.1:8000/categorias/${idCategoria}/`, options)
          .then((response) => {
            if (response.ok) {
              window.location.href = "http://127.0.0.1:5500/admin/cardapio/";
            } else if (response.status === 401) {
              refreshToken().then(() => {
                const novoToken = localStorage.getItem("accessToken");
                options.headers.Authorization = `Bearer ${novoToken}`;
                atualizarCategoria();
              });
            } else if (!response.ok) {
              return response.json();
            }
          })
          .then((r) => console.log(r));
      }

      atualizarCategoria();
    });
  }

  if (pratoFormulario) {
    pratoFormulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const novoNome = document.getElementById("update-prato-nome").value;
      const novoPreco = document.getElementById("update-prato-preco").value;
      const novaDescricao = document.getElementById("update-prato-desc").value;
      const novaImagem = document.getElementById("update-prato-imagem")
        .files[0];

      const formData = new FormData();
      formData.append("nome", novoNome);
      formData.append("preco", novoPreco);
      formData.append("descricao", novaDescricao);

      if (novaImagem) {
        const blobImagem = new Blob([novaImagem], { type: "image/jpeg" });
        formData.append(
          "imagem",
          blobImagem,
          `${novoNome.toLowerCase().replace(/[ ]+/g, "-")}.jpeg`
        );
      }

      const token = localStorage.getItem("accessToken");

      const params = new URLSearchParams(window.location.search);
      const idPrato = params.get("id");
      const idCategoria = params.get("c");

      let options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      console.log(idPrato);

      function atualizarPrato() {
        fetch(`http://127.0.0.1:8000/pratos/${idPrato}/`, options).then(
          (response) => {
            if (response.ok) {
              window.location.href = `http://127.0.0.1:5500/admin/cardapio/categoria/?c=${idCategoria}`;
            } else if (response.status === 403) {
              alert("Você não tem permissão para adicionar novos itens.");
            } else if (response.status === 401) {
              refreshToken().then(() => {
                const novoToken = localStorage.getItem("accessToken");
                options.headers.Authorization = `Bearer ${novoToken}`;
                atualizarPrato();
              });
            } else if (response.status === 400) {
              console.log(response);
              return response.json();
            } else if (response.status === 415) {
              alert.innerHTML = "Arquivo de mídia não suportado";
            }
          }
        );
      }

      atualizarPrato();
    });
  }
}

// Observador para repetir a função caso ocorra mudança no DOM
const observer = new MutationObserver(() => {
  initUpdateObjectsAPI();
});

const container = document.querySelector("[data-get-api-container]");
if (container) {
  observer.observe(container, {
    childList: true, // Observa alterações nos filhos
    subtree: true, // Inclui subárvores no monitoramento
  });
}
