export default function initIsLogged() {
  /*
  Função que verifica se usuário está logado.
  Caso não esteka na tela de login e não tenha o accessToken, o usuário é encaminhado até o login.
  */

  const token = localStorage.getItem("accessToken");
  const loginFlag = document.querySelector("#login");

  if (!loginFlag) {
    if (!token) {
      alert(
        "Você precisa estar autenticado para acessar o Painel de Administração."
      );
      window.location.href = "http://127.0.0.1:5500/admin/login/";
      return;
    }
  }
}
