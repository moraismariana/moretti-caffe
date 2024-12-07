export default function initScrollTo() {
  const scrollToObject = document.querySelector("[data-scroll-to]");
  if (scrollToObject) {
    if (scrollToObject.dataset.scrollTo === "link") {
      scrollToObject.addEventListener("click", () => {
        sessionStorage.setItem("scrollTo", "true");
      });
    } else if (
      scrollToObject.dataset.scrollTo === "scroll" &&
      sessionStorage.scrollTo
    ) {
      const cardapioCategorias = document.querySelector(".cardapio-categorias");
      console.log(cardapioCategorias.offsetTop);
      window.scrollTo({
        top: cardapioCategorias.offsetTop,
        behavior: "smooth",
      });
      sessionStorage.removeItem("scrollTo");
    }
  }
}
