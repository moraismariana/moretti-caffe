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
            // ativar modal
            event.preventDefault();
            container.classList.add("ativo");

            if (container.dataset.modalType != "create-categoria") {
              // alterar URL
              const typeOfButton = botao.dataset.modalType;

              window.history.pushState(
                null,
                null,
                `?c=${botao.dataset.categoriaId}&t=${typeOfButton}`
              );

              // atualizar valor do input
              const input = document.getElementById("update-categoria-nome");
              input.value = botao.dataset.categoriaNome;
            }
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
            if (container.dataset.modalType != "create-categoria") {
              window.history.back();
            }
          });
        }
      });
    });

    containerModal.forEach((container) => {
      container.addEventListener("mousedown", (event) => {
        if (event.target === container) {
          container.classList.remove("ativo");
          if (container.dataset.modalType != "create-categoria") {
            window.history.back();
          }
        }
      });
    });
  }
}
