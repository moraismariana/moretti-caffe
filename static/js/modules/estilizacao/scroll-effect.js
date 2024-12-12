export default function initScrollEffect() {
  // EFEITO DE SCROLL
  const scrollElement = document.querySelectorAll("[data-scroll-element]");

  scrollElement.forEach((element) => {
    if (isInView(element)) {
      element.classList.add("transition-element--visible");
    }
  });

  document.addEventListener("scroll", function () {
    scrollElement.forEach((element) => {
      if (isInView(element)) {
        element.classList.add("transition-element--visible");
      } else {
        element.classList.remove("transition-element--visible");
      }
    });
  });

  function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom > 0 &&
      rect.top <
        (window.innerHeight - 120 ||
          document.documentElement.clientHeight - 120)
    );
  }
}
