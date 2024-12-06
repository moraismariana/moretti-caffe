export default function initUpdateObjectsAPI() {
  const categoriaFormulario = document.getElementById("update-categoria");
  const botoesAbrir = document.querySelectorAll(
    '[data-modal="abrir"][data-modal-type="update-categoria"]'
  );

  console.log(botoesAbrir);
  botoesAbrir.forEach((item) => {
    item.addEventListener("click", (event) => {
      //   window.history.pushState(null, null, "teste");
    });
  });

  if (categoriaFormulario.classList.contains("ativo")) {
    window.history.pushState(null, null, "teste");
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
