import initModal from "./modal.js";
import refreshToken from "./refresh-token.js";

export default function initLinkExternoCMS() {
  /* Função para lidar com links externos na página de edição de conteúdo CMS */

  const formularioLinks = document.getElementById("update-link");

  if (document.body.id === "cms" && formularioLinks) {
    fetch("http://127.0.0.1:8000/linkexterno/1/")
      .then((response) => response.json())
      .then((data) => {
        const botoesWhatsapp = document.querySelectorAll(
          '[data-link="whatsapp"]'
        );
        const botoesMaps = document.querySelectorAll('[data-link="maps"]');
        if (data.whatsapp && botoesWhatsapp.length > 0) {
          const dadoFormatado =
            data.whatsapp.slice(0, 2) +
            " " +
            data.whatsapp.slice(2, 4) +
            " " +
            data.whatsapp.slice(4);
          botoesWhatsapp.forEach((botao) => {
            botao.dataset.linkValor = dadoFormatado;
          });
        }
        if (data.maps && botoesMaps.length > 0) {
          botoesMaps.forEach((botao) => {
            botao.dataset.linkValor = data.maps;
          });
        }
      })
      .finally(() => {
        initModal();
      });

    formularioLinks.addEventListener("submit", (event) => {
      event.preventDefault();

      const params = new URLSearchParams(window.location.search);
      const tipoDeLink = params.get("link");
      const input = document.getElementById("update-link-nome");
      const token = localStorage.getItem("accessToken");

      console.log(tipoDeLink);

      if (tipoDeLink === "whatsapp") {
        const formData = new FormData();
        formData.append("whatsapp", input.value.replace(/[ ]+/g, ""));
        let options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
        enviarLinkExterno(options);
      } else if (tipoDeLink === "maps") {
        const formData = new FormData();
        formData.append("maps", input.value);
        let options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
        enviarLinkExterno(options);
      }

      function enviarLinkExterno(options) {
        fetch("http://127.0.0.1:8000/linkexterno/1/", options)
          .then((response) => {
            if (response.ok) {
              alert("Link externo atualizado com sucesso");
              window.history.back();
              window.location.reload();
            } else if (response.status === 403) {
              alert("Você não tem permissão para adicionar novos itens.");
            } else if (response.status === 401) {
              refreshToken().then(() => {
                const novoToken = localStorage.getItem("accessToken");
                options.headers.Authorization = `Bearer ${novoToken}`;
                enviarLinkExterno(options);
              });
            } else if (response.status === 400) {
              console.log(response);
              return response.json();
            } else if (response.status === 415) {
              alert.innerHTML = "Arquivo de mídia não suportado";
            }
          })
          .then((response) => {
            const alert = document.querySelector("#update-link .form-alert");
            // TRATAMENTO DE EXCEÇÕES EM CADA CAMPO
            console.log(response);
            if (response.whatsapp) {
              alert.innerText = `${response.whatsapp[0]}`;
              document.querySelector("#update-link .form-alert-2").innerHTML =
                "";
            } else if (response.maps) {
              alert.innerText = `${response.maps[0]}`;
            }
          });
      }
    });
  }
}
