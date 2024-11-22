export default function initMenuMobile() {
  const botao = document.querySelector("[data-menu-mobile-botao]");
  let isAnimating = false; // Flag para controlar o estado da animação

  if (botao) {
    botao.addEventListener("click", () => {
      const logo = document.querySelector("ul > li");
      const menuMobile = document.querySelector(".menu-mobile");
      const header = document.querySelector(".header");
      const proximoElemento = header.nextElementSibling.nextElementSibling;

      // Bloqueia cliques enquanto a animação está em andamento
      if (isAnimating) return;

      // Verifica se o menu está ativo
      if (menuMobile.classList.contains("active")) {
        // Adiciona a classe "closing" para ativar a animação de saída
        menuMobile.classList.remove("active");
        menuMobile.classList.add("closing");
        isAnimating = true; // Define a flag como verdadeira

        // Espera o fim da animação para esconder o menu e liberar a flag
        menuMobile.addEventListener(
          "animationend",
          () => {
            menuMobile.classList.remove("closing");
            menuMobile.style.display = "none"; // Garante que ele desapareça visualmente
            isAnimating = false; // Libera a interação
          },
          { once: true }
        );
      } else {
        // Exibe o menu e aplica a animação de entrada
        menuMobile.style.display = "block"; // Garante que ele apareça visualmente
        menuMobile.classList.add("active");
        isAnimating = true; // Define a flag como verdadeira

        // Libera a interação após a animação de entrada
        menuMobile.addEventListener(
          "animationend",
          () => {
            isAnimating = false; // Libera a interação
          },
          { once: true }
        );
      }

      // Alterna as outras classes
      logo.classList.toggle("active");
      header.classList.toggle("active");
      proximoElemento.classList.toggle("active");
    });
  }
}
