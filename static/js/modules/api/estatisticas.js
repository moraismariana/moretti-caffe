export default function initEstatisticas() {}
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

function acessoEmCadaPagina() {
  if (!sessionStorage.acessoPaginaInicial) {
    sessionStorage.setItem("acessoPaginaInicial", false);
  }
  if (!sessionStorage.acessoSobre) {
    sessionStorage.setItem("acessoSobre", false);
  }
  if (!sessionStorage.acessoCardapio) {
    sessionStorage.setItem("acessoCardapio", false);
  }

  if (window.location.pathname === "/") {
    if (!sessionStorage.acessoPaginaInicial) {
      sessionStorage.setItem("acessoPaginaInicial", true);
    }
  }

  switch (window.location.pathname) {
    case "/":
      sessionStorage.setItem("acessoPaginaInicial", true);
      break;
    case "/sobre/":
      sessionStorage.setItem("acessoSobre", true);
      break;
    case "/cardapio/":
      sessionStorage.setItem("acessoCardapio", true);
      break;
    case "/cardapio/categoria/":
      sessionStorage.setItem("acessoCardapio", true);
      break;
  }
}

function toqueEmLinkExterno() {
  const linksContato = document.querySelectorAll(
    '[data-link-externo="contato"]'
  );
  if (!sessionStorage.toqueLinkContato) {
    sessionStorage.setItem("toqueLinkContato", false);
  }
  if (linksContato) {
    linksContato.forEach((link) => {
      link.addEventListener("click", () => {
        sessionStorage.setItem("toqueLinkContato", true);
      });
    });
  }
}

function revisita() {
  if (!localStorage.revisita) {
    localStorage.setItem("revisita", false);
  }
}

function enviarDadosAPI(dados) {
  const url = "http://127.0.0.1:8000/acessos/";
  navigator.sendBeacon(url, JSON.stringify(dados));
}

function isTruthy(valor) {
  return valor === "true" ? true : false;
}

acessoEmCadaPagina();
toqueEmLinkExterno();
revisita();

const dados = {
  revisita: isTruthy(localStorage.revisita),
  acesso_cardapio: isTruthy(sessionStorage.acessoCardapio),
  acesso_pagina_inicial: isTruthy(sessionStorage.acessoPaginaInicial),
  acesso_sobre: isTruthy(sessionStorage.acessoSobre),
  toque_contato: isTruthy(sessionStorage.toqueLinkContato),
};

if (window.innerWidth < 768) {
  document.addEventListener("visibilitychange", () => {
    if (!sessionStorage.dadosEnviadosAPI) {
      if (document.visibilityState === "hidden") {
        console.log("janela diminuída");
        sessionStorage.setItem("dadosEnviadosAPI", true);
      }
    }
  });
  window.addEventListener("beforeunload", () => {
    if (!sessionStorage.dadosEnviadosAPI) {
      const navType = performance.getEntriesByType("navigation")[0].type;
      if (navType === "reload" || navType === "navigate") {
        return;
      }
      console.log("beforeunload ativado");
    }
  });
} else {
  window.addEventListener("beforeunload", () => {
    const navType = performance.getEntriesByType("navigation")[0].type;
    if (navType === "reload" || navType === "navigate") {
      return;
    }
    console.log("beforeunload ativado");
  });
}
