import refreshToken from "./refresh-token.js";

export default function initUpdateObjectsAPI() {
  const categoriaFormulario = document.getElementById("update-categoria");

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

      let options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      };

      console.log(body);

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
