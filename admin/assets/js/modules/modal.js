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

  function atualizarValoresInputs(botao) {
    /* Função para preencher inputs de Editar Categoria e Editar Prato com valores anteriores*/

    if (document.body.id === "cardapio") {
      const input = document.getElementById("update-categoria-nome");
      input.value = botao.dataset.categoriaNome;
    } else if (document.body.id === "categoria") {
      const nome = document.getElementById("update-prato-nome");
      const preco = document.getElementById("update-prato-preco");
      const descricao = document.getElementById("update-prato-desc");

      nome.value = botao.dataset.pratoNome;
      preco.value = botao.dataset.pratoPreco;
      descricao.value = botao.dataset.pratoDesc;
    }
  }

  function alterarURL(botao) {
    const typeOfButton = botao.dataset.modalType;

    if (document.body.id === "cardapio") {
      window.history.pushState(
        null,
        null,
        `?c=${botao.dataset.categoriaId}&t=${typeOfButton}`
      );
    } else if (document.body.id === "categoria") {
      window.history.pushState(
        null,
        null,
        `?c=${botao.dataset.categoriaId}&id=${botao.dataset.pratoId}&t=${typeOfButton}`
      );
    }
  }

  if (botaoAbrir && botaoFechar && containerModal) {
    botaoAbrir.forEach((botao) => {
      containerModal.forEach((container) => {
        if (container.dataset.modalType === botao.dataset.modalType) {
          botao.addEventListener("click", (event) => {
            // ativar modal
            event.preventDefault();
            container.classList.add("ativo");

            if (
              container.dataset.modalType != "create-categoria" &&
              container.dataset.modalType != "create-prato"
            ) {
              // alterar URL
              alterarURL(botao);

              // atualizar valor do input
              atualizarValoresInputs(botao);
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
            if (
              container.dataset.modalType != "create-categoria" &&
              container.dataset.modalType != "create-prato"
            ) {
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
          if (
            container.dataset.modalType != "create-categoria" &&
            container.dataset.modalType != "create-prato"
          ) {
            window.history.back();
          }
        }
      });
    });
  }
}
