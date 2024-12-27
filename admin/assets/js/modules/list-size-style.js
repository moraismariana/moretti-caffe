export default function initListSizeStyle() {
  /*
  Função para alterar a estilização quando uma lista for muito grande (lista do cardápio e lista da categoria).
  Para utilizar, é necessário colocar os atributos data-list-size e data-list-size-tam no elemento HTML que será estilizado:
    - O data-list-size indica que a função será ativada;
    - O data-list-style-tam indica a partir de quantos itens na lista a função será ativada.
  O atributo data-list-size-item em cada item da lista (para ser contado quantos itens tem na lista).
  Também fazer a estilização no CSS.
  */

  const conteudo = document.querySelector("[data-list-size]");
  const listaItens = document.querySelectorAll("[data-list-size-item]");

  function ativarAviso() {
    /* Ativa um aviso caso não tenha nenhuma categoria ou prato. */
    if (listaItens.length === 0) {
      const aviso = document.querySelector(".cardapio-aviso");
      if (aviso) {
        aviso.classList.add("ativo");
      }
    } else if (listaItens.length > 0) {
      const aviso = document.querySelector(".cardapio-aviso");
      if (aviso) {
        aviso.classList.remove("ativo");
      }
    }
  }

  if (conteudo && listaItens) {
    if (document.body.id === "categoria" && window.innerWidth <= 768) {
      conteudo.dataset.listSizeTam = "1";
    }
    ativarAviso();
    if (
      listaItens.length <= +conteudo.dataset.listSizeTam ||
      !(window.innerWidth <= 480) ||
      listaItens.length === 0
    ) {
      conteudo.dataset.listSizeP = "true";
    }
    if (
      listaItens.length > +conteudo.dataset.listSizeTam ||
      (window.innerWidth <= 480 &&
        listaItens.length >= 1 &&
        document.body.id === "categoria")
    ) {
      conteudo.dataset.listSizeP = "false";
    }
  }
}
