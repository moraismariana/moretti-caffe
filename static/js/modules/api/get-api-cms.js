export default function initGetApiCms() {
  const textosHtml = document.querySelectorAll('[data-cms="texto"]');
  const imgsHtml = document.querySelectorAll('[data-cms="img"]');
  const bgsHtml = document.querySelectorAll('[data-cms="bg"]');

  let promises = [];

  if (textosHtml[0] && window.Texto_CMS_URL) {
    promises.push(fetch(window.Texto_CMS_URL));
  }

  if (bgsHtml[0] && window.Bg_CMS_URL) {
    promises.push(fetch(window.Bg_CMS_URL));
  }

  if (imgsHtml[0] && window.Img_CMS_URL) {
    promises.push(fetch(window.Img_CMS_URL));
  }

  if (textosHtml[0] || bgsHtml[0] || imgsHtml[0]) {
    Promise.all(promises)
      .then(async (responses) => {
        for (const response of responses) {
          const dados = await response.json();
          switch (response.url) {
            case window.Texto_CMS_URL:
              let textosApi = Object.values(dados);
              let textosApiAttr = Object.keys(dados);
              textosApi.shift();
              textosApiAttr.shift();
              for (let i = 0; i < textosHtml.length; i++) {
                if (!textosHtml[i].innerHTML.includes("<textarea")) {
                  textosHtml[i].innerText = textosApi[i];
                } else {
                  textosHtml[i].querySelector(
                    "textarea"
                  ).dataset.cmsAtributo = `${textosApiAttr[i]}`;
                  textosHtml[i].querySelector("textarea").innerText =
                    textosApi[i];
                }
              }
              break;
            case window.Bg_CMS_URL:
              let bgsApi = Object.values(dados);
              let bgdApiAttr = Object.keys(dados);
              bgsApi.shift();
              bgdApiAttr.shift();
              for (let i = 0; i < bgsHtml.length; i++) {
                bgsHtml[i].style.backgroundImage = `url(${bgsApi[i]})`;
                bgsHtml[i].dataset.cmsAtributo = `${bgdApiAttr[i]}`;
              }
              break;
            case window.Img_CMS_URL:
              let imgsApi = Object.values(dados);
              let imgsApiAttr = Object.keys(dados);
              imgsApi.shift();
              imgsApiAttr.shift();
              for (let i = 0; i < imgsHtml.length; i++) {
                imgsHtml[i].src = imgsApi[i];
                imgsHtml[i].dataset.cmsAtributo = `${imgsApiAttr[i]}`;
              }
              break;
          }
        }
      })
      .finally(() => {
        document.body.classList.add("visible");
      });
  }
}
