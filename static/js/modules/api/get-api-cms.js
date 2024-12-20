export default function initGetApiCms() {
  const textosHtml = document.querySelectorAll('[data-cms="texto"]');
  const imgsHtml = document.querySelectorAll('[data-cms="img"]');
  const bgsHtml = document.querySelectorAll('[data-cms="bg"]');

  function preencherTextos() {
    fetch(window.Texto_CMS_URL)
      .then((response) => response.json())
      .then((dados) => {
        let textosApi = Object.values(dados);
        textosApi.shift();
        for (let i = 0; i < textosHtml.length; i++) {
          if (!textosHtml[i].innerHTML.includes("<textarea")) {
            textosHtml[i].innerText = textosApi[i];
          } else {
            textosHtml[i].querySelector("textarea").innerText = textosApi[i];
          }
        }
      });
  }

  function preencherBgs() {
    fetch(window.Bg_CMS_URL)
      .then((response) => response.json())
      .then((dados) => {
        let bgsApi = Object.values(dados);
        bgsApi.shift();
        for (let i = 0; i < bgsHtml.length; i++) {
          bgsHtml[i].style.backgroundImage = `url(${bgsApi[i]})`;
        }
      });
  }

  function preencherImgs() {
    fetch(window.Img_CMS_URL)
      .then((response) => response.json())
      .then((dados) => {
        let imgsApi = Object.values(dados);
        imgsApi.shift();
        for (let i = 0; i < imgsHtml.length; i++) {
          imgsHtml[i].src = imgsApi[i];
        }
      });
  }

  if (textosHtml[0] && window.Texto_CMS_URL) {
    preencherTextos();
  }

  if (bgsHtml[0] && window.Bg_CMS_URL) {
    preencherBgs();
  }

  if (imgsHtml[0] && window.Img_CMS_URL) {
    preencherImgs();
  }
}
