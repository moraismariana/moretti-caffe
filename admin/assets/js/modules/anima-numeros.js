export default function initAnimaNumeros() {
  let numeros = document.querySelectorAll("[data-anima-numero]");

  function animacaoNumeros() {
    numeros.forEach((numero) => {
      let total = +numero.innerText;
      let incremento = Math.floor(total / 10);
      if (incremento === 0) {
        incremento = 1;
      }
      let start = 0;
      let timer = setInterval(() => {
        start += incremento;
        numero.innerText = start;
        if (start > total) {
          numero.innerText = total;
          clearInterval(timer);
        }
      }, 60);
    });
  }

  if (numeros.length > 0) {
    animacaoNumeros();
  }
}
