import createFittedImage from "./fitted-image.js";
import refreshToken from "./refresh-token.js";

export default function initUpdateObjectsAPI() {
  function updateObjects() {
    const categoriaFormulario = document.getElementById("update-categoria");
    const pratoFormulario = document.getElementById("update-prato");

    if (categoriaFormulario) {
      categoriaFormulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const novoNomeCategoria = document.getElementById(
          "update-categoria-nome"
        ).value;

        const token = localStorage.getItem("accessToken");

        const params = new URLSearchParams(window.location.search);
        const idCategoria = params.get("c");

        const body = JSON.stringify({
          id: idCategoria,
          nome: novoNomeCategoria,
        });

        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        };

        function atualizarCategoria() {
          fetch(`http://127.0.0.1:8000/categorias/${idCategoria}/`, options)
            .then((response) => {
              if (response.ok) {
                window.location.href = "http://127.0.0.1:5500/admin/cardapio/";
              } else if (response.status === 401) {
                refreshToken().then(() => {
                  const novoToken = localStorage.getItem("accessToken");
                  options.headers.Authorization = `Bearer ${novoToken}`;
                  atualizarCategoria();
                });
              } else if (response.status === 400) {
                return response.json();
              } else if (!response.ok) {
                console.log(response.json());
              }
            })
            .then((response) => {
              // TRATAMENTO DE EXCEÇÕES EM CADA CAMPO
              if (response.nome) {
                const alert = document.querySelector(
                  "#update-categoria .form-alert"
                );
                const string = response.nome[0];
                const novaString =
                  string.charAt(0).toUpperCase() + string.slice(1);
                alert.innerHTML = novaString;
                console.log(novaString);
              }
            });
        }

        atualizarCategoria();
      });
    }

    if (pratoFormulario) {
      pratoFormulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const alert = document.querySelector("#update-prato .form-alert");
        const token = localStorage.getItem("accessToken");

        const novoNome = document.getElementById("update-prato-nome").value;
        const novoPreco = document.getElementById("update-prato-preco").value;
        const novaDescricao =
          document.getElementById("update-prato-desc").value;
        const imagem = document.getElementById("update-prato-imagem").files[0];

        const altura = 1200;
        const largura = 1200;

        const formData = new FormData();
        formData.append("nome", novoNome);
        formData.append("preco", novoPreco);
        formData.append("descricao", novaDescricao);

        if (imagem) {
          const imageName = `${novoNome.toLowerCase().replace(/[ ]+/g, "-")}`;
          try {
            const fittedImageURL = await createFittedImage(
              imagem,
              altura,
              largura
            );
            const response = await fetch(fittedImageURL);
            const fittedImageBlob = await response.blob();
            formData.append("imagem", fittedImageBlob, `${imageName}.webp`);
          } catch (error) {
            console.error("Erro ao processar a imagem:", error.message);
          }
        }

        const params = new URLSearchParams(window.location.search);
        const idPrato = params.get("id");
        const idCategoria = params.get("c");

        let options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };

        function atualizarPrato() {
          fetch(`http://127.0.0.1:8000/pratos/${idPrato}/`, options)
            .then((response) => {
              if (response.ok) {
                window.location.href = `http://127.0.0.1:5500/admin/cardapio/categoria/?c=${idCategoria}`;
              } else if (response.status === 403) {
                alert("Você não tem permissão para adicionar novos itens.");
              } else if (response.status === 401) {
                refreshToken().then(() => {
                  const novoToken = localStorage.getItem("accessToken");
                  options.headers.Authorization = `Bearer ${novoToken}`;
                  atualizarPrato();
                });
              } else if (response.status === 400) {
                console.log(response);
                return response.json();
              } else if (response.status === 415) {
                alert.innerHTML = "Arquivo de mídia não suportado";
              }
            })
            .then((response) => {
              // TRATAMENTO DE EXCEÇÕES EM CADA CAMPO
              console.log(response);
              if (response.nome) {
                alert.innerText = `${response.nome[0].replace(
                  "este campo",
                  "o campo Nome"
                )}`;
              } else if (response.preco) {
                alert.innerText = `${response.preco[0].replace(
                  "este campo",
                  "o campo Preço"
                )}`;
              } else if (response.imagem) {
                alert.innerText = `${response.imagem[0].replace(
                  "este campo",
                  "o campo Preço"
                )}`;
              } else if (response.descricao) {
                alert.innerText = `${response.imagem[0].replace(
                  "este campo",
                  "o campo Preço"
                )}`;
              }
            });
        }

        atualizarPrato();
      });
    }
  }

  // Observador para repetir a função caso ocorra mudança no DOM
  const observer = new MutationObserver(() => {
    updateObjects();
  });

  const container = document.querySelector("[data-get-api-container]");
  if (container) {
    observer.observe(container, {
      childList: true, // Observa alterações nos filhos
      subtree: true, // Inclui subárvores no monitoramento
    });
  }
}
