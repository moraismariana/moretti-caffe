export default function initLogin() {
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };

      fetch("http://127.0.0.1:8000/api/token/", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.access && data.refresh) {
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            window.location.href = "http://127.0.0.1:5500/admin/";
          } else if (data.detail) {
            const alerta = document.querySelector(".login-form-alert");
            alerta.classList.add("ativo");
            alerta.innerHTML = data.detail;
            console.log(data.detail);
          }
        });
    });
  }
}
