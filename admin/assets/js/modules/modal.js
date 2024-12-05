export default function initModal() {
  /*
  Função para fazer os botões (create, update, delete) abrirem o modal certo.
  Os botões que abrem e fecham o modal devem conter os atributos:
    - data-modal="abrir" ou data-modal="fechar"
    - data-modal-type="<o mesmo que o container do modal>"
  O modal deve conter os atributos:
    - data-modal="container"
    - data-modal-type="<o mesmo que os botões>"
  */

  const botaoAbrir = document.querySelectorAll('[data-modal="abrir"]');
  const botaoFechar = document.querySelectorAll('[data-modal="fechar"]');
  const containerModal = document.querySelectorAll('[data-modal="container"]');

  if (botaoAbrir && botaoFechar && containerModal) {
    botaoAbrir.forEach((botao) => {
      containerModal.forEach((container) => {
        if (container.dataset.modalType === botao.dataset.modalType) {
          botao.addEventListener("click", (event) => {
            event.preventDefault();
            container.classList.add("ativo");
          });
        }
      });
    });

    botaoFechar.forEach((botao) => {
      containerModal.forEach((container) => {
        if (container.dataset.modalType === botao.dataset.modalType) {
          botao.addEventListener("click", (event) => {
            event.preventDefault();
            container.classList.remove("ativo");
          });
        }
      });
    });

    containerModal.forEach((container) => {
      container.addEventListener("mousedown", (event) => {
        if (event.target === container) {
          container.classList.remove("ativo");
        }
      });
    });
  }
}

// Observador para repetir a função caso ocorra mudança no DOM
const observer = new MutationObserver(() => {
  initModal();
});

const container = document.querySelector("[data-get-api-container]");
if (container) {
  observer.observe(container, {
    childList: true, // Observa alterações nos filhos
    subtree: true, // Inclui subárvores no monitoramento
  });
}
