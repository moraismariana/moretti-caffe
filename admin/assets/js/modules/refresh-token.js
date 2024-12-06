export default function refreshToken() {
  /* Função para atualizar o token de acesso, ao fazer requisições como POST, PATCH e DELETE */
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return alert("Sessão expirada. Faça login e tente novamente.");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  };

  return fetch("http://127.0.0.1:8000/api/token/refresh/", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("accessToken", data.access);
      console.log("Token renovado com sucesso.");
    })
    .catch((error) => {
      console.error("Erro na renovação do token:", error);
      // Opcional: tomar ações, como redirecionar para login
    });
}
