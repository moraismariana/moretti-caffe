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
    sessionStorage.setItem("acessoPaginaInicial", 0);
  }
  if (!sessionStorage.acessoSobre) {
    sessionStorage.setItem("acessoSobre", 0);
  }
  if (!sessionStorage.acessoCardapio) {
    sessionStorage.setItem("acessoCardapio", 0);
  }

  if (window.location.pathname === "/") {
    if (!sessionStorage.acessoPaginaInicial) {
      sessionStorage.setItem("acessoPaginaInicial", 1);
    }
  }

  switch (window.location.pathname) {
    case "/":
      sessionStorage.setItem("acessoPaginaInicial", 1);
      break;
    case "/sobre/":
      sessionStorage.setItem("acessoSobre", 1);
      break;
    case "/cardapio/":
      sessionStorage.setItem("acessoCardapio", 1);
      break;
    case "/cardapio/categoria/":
      sessionStorage.setItem("acessoCardapio", 1);
      break;
  }
}

function toqueEmLinkExterno() {
  const linksContato = document.querySelectorAll(
    '[data-link-externo="contato"]'
  );
  if (!sessionStorage.toqueLinkContato) {
    sessionStorage.setItem("toqueLinkContato", 0);
  }
  if (linksContato) {
    linksContato.forEach((link) => {
      link.addEventListener("click", () => {
        sessionStorage.setItem("toqueLinkContato", 1);
      });
    });
  }
}

acessoEmCadaPagina();
toqueEmLinkExterno();
