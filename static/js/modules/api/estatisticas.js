export default function initEstatisticas() {
  /*
  Acesso:
  Se está carregando o javascript, então acessou o site. Não precisa de nenhuma lógica para enviar +1 acesso para API.
  
  Revisita:
  Caso o usuário tenha no localStorage um valor do tipo hasVisitedBefore, então posso enviar +1 para revisita também. Esse valor pode ser armazenado após enviar o fetch, ao final da sessão.
  
  Acessos em cada página:
  Sempre que entrar em uma página, armazenar no sessionStorage o valor 1 indicando que entrou naquela página. Caso acesse a mesma página novamente, continuará sendo contabilizado 1 única vez. Esse valor será enviado ao final com o fetch.
  
  Toques em link externo:
  Sempre que o usuário tocar em um link externo durante a sessão, armazenar no sessionStorage o valor 1 indicando que tocou naquele link. Caso toque no link novamente, continuará sendo contabilizado 1 única vez.
  */

  function resetarValoresLocalStorage() {
    /* Caso o link anterior da navegação seja o próprio site, não faz nada.
    Porém, caso tenha vindo de outro site, a função reseta os valores do localStorage referente às estatísticas, exceto o de revisita. */
    if (
      document.referrer.startsWith("http://127.0.0.1:5500") ||
      document.referrer.startsWith(
        "https://moraismariana.github.io/moretti-caffe/"
      )
    ) {
      return;
    } else {
      localStorage.setItem("acessoPaginaInicial", false);
      localStorage.setItem("acessoSobre", false);
      localStorage.setItem("acessoCardapio", false);
      localStorage.setItem("toqueLinkContato", false);
      localStorage.setItem("dadosEnviadosAPI", false);
    }
  }

  resetarValoresLocalStorage();

  function acessoEmCadaPagina() {
    switch (window.location.pathname) {
      case "/":
      case "/moretti-caffe/":
        localStorage.setItem("acessoPaginaInicial", true);
        break;
      case "/sobre/":
      case "/moretti-caffe/sobre/":
        localStorage.setItem("acessoSobre", true);
        break;
      case "/cardapio/":
      case "/moretti-caffe/cardapio/":
        localStorage.setItem("acessoCardapio", true);
        break;
      case "/cardapio/categoria/":
      case "/moretti-caffe/categoria/":
        localStorage.setItem("acessoCardapio", true);
        break;
    }
  }

  acessoEmCadaPagina();

  function toqueEmLinkExterno() {
    const linksContato = document.querySelectorAll(
      '[data-link-externo="contato"]'
    );
    if (linksContato) {
      linksContato.forEach((link) => {
        link.addEventListener("click", () => {
          localStorage.setItem("toqueLinkContato", true);
        });
      });
    }
  }

  toqueEmLinkExterno();

  function revisita() {
    if (!localStorage.revisita) {
      localStorage.setItem("revisita", false);
    }
  }

  revisita();

  function enviarDadosAPI(dados) {
    const url = "http://127.0.0.1:8000/acessos/";
    navigator.sendBeacon(url, JSON.stringify(dados));
    localStorage.setItem("revisita", true);
    localStorage.setItem("dadosEnviadosAPI", true);
  }

  function preparacaoDosDados() {
    function isTruthy(valor) {
      return valor === "true" ? true : false;
    }

    const dados = {
      revisita: isTruthy(localStorage.revisita),
      acesso_cardapio: isTruthy(localStorage.acessoCardapio),
      acesso_pagina_inicial: isTruthy(localStorage.acessoPaginaInicial),
      acesso_sobre: isTruthy(localStorage.acessoSobre),
      toque_contato: isTruthy(localStorage.toqueLinkContato),
    };

    if (window.innerWidth < 768) {
      /* Envio de dados em dispositivos móveis */
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          if (localStorage.dadosEnviadosAPI === "false") {
            enviarDadosAPI(dados);
          }
        }
      });
    } else {
      /* Envio de dados em desktops */

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          window.addEventListener("beforeunload", () => {
            enviarDadosAPI(dados);
          });
        }
      });
    }
  }

  preparacaoDosDados();
}
