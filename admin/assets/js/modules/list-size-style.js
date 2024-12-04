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

  if (conteudo && listaItens) {
    if (listaItens.length <= +conteudo.dataset.listSizeTam) {
      conteudo.dataset.listSizeP = "true";
    }
  }
}
