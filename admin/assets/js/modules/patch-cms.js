import refreshToken from "./refresh-token.js";

export default function initPatchCms() {
  /* Função para enviar dados dos inputs para API, atualizando o conteúdo do site. */
  const textoInputs = document.querySelectorAll('[data-cms="texto-input"]');
  const imgInputs = document.querySelectorAll('[data-cms="img-input"]');
  const bgInputs = document.querySelectorAll('[data-cms="bg-input"]');

  const imgsHtml = document.querySelectorAll('[data-cms="img"]');
  const bgsHtml = document.querySelectorAll('[data-cms="bg"]');

  if (imgInputs[0]) {
    for (let i = 0; i < imgsHtml.length; i++) {
      imgsHtml[i].addEventListener("click", () => {
        imgInputs[i].click();
      });

      imgInputs[i].addEventListener("change", (event) => {
        let file = event.target.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let img = new Image();
            img.onload = function () {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");

              let width = parseInt(imgsHtml[i].getAttribute("data-width"));
              let height = parseInt(imgsHtml[i].getAttribute("data-height"));

              let aspectRatio = Math.max(
                width / img.width,
                height / img.height
              );

              let newWidth = img.width * aspectRatio;
              let newHeight = img.height * aspectRatio;
              let offsetX = (newWidth - width) / 2;
              let offsetY = (newHeight - height) / 2;

              canvas.width = width;
              canvas.height = height;

              ctx.drawImage(img, -offsetX, -offsetY, newWidth, newHeight);

              imgsHtml[i].src = canvas.toDataURL(file.type);

              imgsHtml[i].dataset.imageData = canvas.toDataURL(file.type);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  if (bgInputs[0]) {
    for (let i = 0; i < bgsHtml.length; i++) {
      bgsHtml[i].addEventListener("click", (event) => {
        if (
          event.target.tagName !== "TEXTAREA" &&
          event.target.tagName !== "A"
        ) {
          bgInputs[i].click();
        }
      });

      bgInputs[i].addEventListener("change", (event) => {
        let file = event.target.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onload = function (e) {
            bgsHtml[i].style.backgroundImage = `url(${e.target.result})`;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  function prepararDados() {
    const formulario = document.querySelector(".cms-form");
    if (formulario) {
      formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        let textosFormData;
        let imgsFormData;
        let bgsFormData;

        // TEXTOS
        if (textoInputs[0]) {
          textosFormData = new FormData();
          for (let i = 0; i < textoInputs.length; i++) {
            console.log(textoInputs[i].dataset.cmsAtributo);
            console.log(textoInputs[i].value);
            textosFormData.append(
              textoInputs[i].dataset.cmsAtributo,
              textoInputs[i].value
            );
          }
        }

        // IMAGENS
        if (imgInputs[0]) {
          imgsFormData = new FormData();
          for (let i = 0; i < imgInputs.length; i++) {
            let img = imgInputs[i].files[0];
            if (img) {
              let imgDataUrl = imgsHtml[i].dataset.imageData;
              if (imgDataUrl) {
                fetch(imgDataUrl)
                  .then((response) => response.blob())
                  .then((blob) => {
                    imgsFormData.append(
                      imgsHtml[i].dataset.cmsAtributo,
                      blob,
                      `${imgsHtml[i].dataset.cmsAtributo}.jpeg`
                    );
                  });
              }
            }
          }
        }

        // BACKGROUNDS
        if (bgInputs[0]) {
          bgsFormData = new FormData();
          for (let i = 0; i < bgInputs.length; i++) {
            let bg = bgInputs[i].files;
            if (bg) {
              bgsFormData.append(bgsHtml[i].dataset.cmsAtributo, bg);
            }
          }
        }
        enviarDados(textosFormData, imgsFormData, bgsFormData);
      });
    }
  }

  prepararDados();

  function enviarDados(textosFormData, imgsFormData, bgsFormData) {
    const token = localStorage.getItem("accessToken");

    enviarTextos(textosFormData);

    function enviarTextos(textosFormData) {
      if (textosFormData && window.Texto_CMS_URL) {
        let options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: textosFormData,
        };

        fetch(window.Texto_CMS_URL, options).then((response) => {
          if (response.ok) {
            alert("Página atualizada com sucesso!");
            window.location.reload();
          } else if (response.status === 401) {
            refreshToken().then(() => {
              const novoToken = localStorage.getItem("accessToken");
              options.headers.Authorization = `Bearer ${novoToken}`;
              enviarDados(textosFormData, imgsFormData, bgsFormData);
            });
          } else if (!response.ok) {
            console.log(response);
          }
        });
      }
    }
  }
}
