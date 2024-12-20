export default function initGetApiCms() {
  const textosHtml = document.querySelectorAll('[data-cms="texto"]');
  const imgsHtml = document.querySelectorAll('[data-cms="img"]');
  const bgsHtml = document.querySelectorAll('[data-cms="bg"]');

  function preencherTextos() {
    fetch(window.Texto_CMS_URL)
      .then((response) => response.json())
      .then((dados) => {
        let textosApi = Object.values(dados);
        let atributosApi = Object.keys(dados);
        textosApi.shift();
        atributosApi.shift();
        for (let i = 0; i < textosHtml.length; i++) {
          if (!textosHtml[i].innerHTML.includes("<textarea")) {
            textosHtml[i].innerText = textosApi[i];
          } else {
            textosHtml[i].querySelector(
              "textarea"
            ).dataset.cmsAtributo = `${atributosApi[i]}`;
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
        let atributosApi = Object.keys(dados);
        bgsApi.shift();
        atributosApi.shift();
        for (let i = 0; i < bgsHtml.length; i++) {
          bgsHtml[i].style.backgroundImage = `url(${bgsApi[i]})`;
          bgsHtml[i].dataset.cmsAtributo = `${atributosApi[i]}`;
        }
      });
  }

  function preencherImgs() {
    fetch(window.Img_CMS_URL)
      .then((response) => response.json())
      .then((dados) => {
        let imgsApi = Object.values(dados);
        let atributosApi = Object.keys(dados);
        imgsApi.shift();
        atributosApi.shift();
        for (let i = 0; i < imgsHtml.length; i++) {
          imgsHtml[i].src = imgsApi[i];
          imgsHtml[i].dataset.cmsAtributo = `${atributosApi[i]}`;
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
