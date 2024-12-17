export default function initGetEstatisticas() {
  /* Função para capturar dados da API com base nos filtros de intervalo de tempo */

  const filterButtons = document.querySelectorAll("[data-filter-button]");

  if (filterButtons[0]) {
    fazerRequisicao("http://127.0.0.1:8000/acessos/resumo/30/", "30");

    filterButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        filterButtons.forEach((button) => {
          button.classList.remove("active");
        });
        button.classList.add("active");
        filtrarDados(button);
      });
    });

    function filtrarDados(button) {
      /* Função que filtra os dados com base no botão selecionado */
      const filtro = button.dataset.filterButton;

      switch (filtro) {
        case "geral":
          fazerRequisicao(
            "http://127.0.0.1:8000/estatisticas-gerais/1/",
            "geral"
          );
          break;
        case "30":
          fazerRequisicao("http://127.0.0.1:8000/acessos/resumo/30/", "30");
          break;
        case "15":
          fazerRequisicao("http://127.0.0.1:8000/acessos/resumo/15/", "15");
          break;
        case "7":
          fazerRequisicao("http://127.0.0.1:8000/acessos/resumo/7/", "7");
          break;
        case "1":
          fazerRequisicao("http://127.0.0.1:8000/acessos/resumo/1/", "1");
          break;
      }
    }

    function fazerRequisicao(url, tipoDeFiltro) {
      /* Função que padroniza a requisição à API com base na URL recebida pelo parâmetro */
      fetch(url)
        .then((response) => response.json())
        .then((dados) => {
          manipularDOM(dados, tipoDeFiltro);
        })
        .catch(() =>
          alert(
            "Não foi possível fazer a requisição ao servidor. Lamentamos o transtorno."
          )
        );
    }

    function manipularDOM(dados, tipoDeFiltro) {
      const elementosDom = document.querySelectorAll('[data-filter="dados"]');
      elementosDom[0].innerText = dados.acessos;
      elementosDom[2].innerText = dados.revisitas;
      elementosDom[4].innerText = dados.acessos_pagina_inicial;
      elementosDom[5].innerText = dados.acessos_cardapio;
      elementosDom[6].innerText = dados.acessos_sobre;
      elementosDom[7].innerText = dados.toques_link_contato;

      switch (tipoDeFiltro) {
        case "geral":
          elementosDom[1].innerText = "acessos desde o começo do site";
          elementosDom[3].innerText = "revisitas desde o começo do site";
          break;
        case "30":
          elementosDom[1].innerText = "acessos nos últimos 30 dias";
          elementosDom[3].innerText = "revisitas nos últimos 30 dias";
          break;
        case "15":
          elementosDom[1].innerText = "acessos nos últimos 15 dias";
          elementosDom[3].innerText = "revisitas nos últimos 15 dias";
          break;
        case "7":
          elementosDom[1].innerText = "acessos nos últimos 7 dias";
          elementosDom[3].innerText = "revisitas nos últimos 7 dias";
          break;
        case "1":
          elementosDom[1].innerText = "acessos no dia de hoje";
          elementosDom[3].innerText = "revisitas no dia de hoje";
          break;
      }
    }
  }
}
