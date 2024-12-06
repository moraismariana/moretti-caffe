import refreshToken from "./refresh-token.js";

export default function initDeleteObjectsAPI() {
  const categoriaFormulario = document.getElementById("delete-categoria");

  if (categoriaFormulario) {
    categoriaFormulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const token = localStorage.getItem("accessToken");

      const params = new URLSearchParams(window.location.search);
      const idCategoria = params.get("c");

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      function deletarCategoria() {
        fetch(`http://127.0.0.1:8000/categorias/${idCategoria}/`, options)
          .then((response) => {
            if (response.ok) {
              window.location.href = "http://127.0.0.1:5500/admin/cardapio/";
            } else if (response.status === 401) {
              refreshToken().then(() => {
                const novoToken = localStorage.getItem("accessToken");
                options.headers.Authorization = `Bearer ${novoToken}`;
                deletarCategoria();
              });
            } else if (!response.ok) {
              return response.json();
            }
          })
          .then((r) => console.log(r));
      }

      deletarCategoria();
    });
  }
}

// Observador para repetir a função caso ocorra mudança no DOM
const observer = new MutationObserver(() => {
  initDeleteObjectsAPI();
});

const container = document.querySelector("[data-get-api-container]");
if (container) {
  observer.observe(container, {
    childList: true, // Observa alterações nos filhos
    subtree: true, // Inclui subárvores no monitoramento
  });
}
