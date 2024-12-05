export default function initLogout() {
  /* Função para deslogar o usuário caso aperte o botão de deslogar ou caso passe 6 horas após o login. */

  function logoutUser() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loginTime");
    window.location.href = "http://127.0.0.1:5500/admin/login";
  }

  const logoutButton = document.querySelector("[data-logout]");

  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logoutUser();
    });
  }

  const duracaoSessao = 6 * 60 * 60 * 1000; // 6 horas em milissegundos
  const loginTime = localStorage.getItem("loginTime");

  if (loginTime) {
    const tempoPassado = Date.now() - parseInt(loginTime, 10);
    if (tempoPassado >= duracaoSessao) {
      alert("Sessão expirada. Faça o login novamente");
      logoutUser();
    } else {
      setTimeout(() => {
        alert("Sessão expirada. Faça o login novamente");
        logoutUser();
      }, duracaoSessao - tempoPassado);
    }
  }
}
