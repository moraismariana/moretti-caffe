import refreshToken from "./refresh-token.js";

export default function initCreateObjectsAPI() {
  /* Função para enviar dados para API */
  //   401 > token expirado ( precisa dar refresh)
  //   403 > não tem autorização para mudar a rota
  //   400 > bad request (já existe com item esse nome)

  const categoriaFormulario = document.getElementById("create-categoria");
  const pratoFormulario = document.getElementById("create-prato");

  if (categoriaFormulario) {
    categoriaFormulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const nomeCategoria = document.getElementById(
        "create-categoria-nome"
      ).value;

      const token = localStorage.getItem("accessToken");

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nomeCategoria,
        }),
      };

      function enviarNovaCategoria() {
        fetch("http://127.0.0.1:8000/categorias/", options)
          .then((response) => {
            if (response.ok) {
              window.location.href = "http://127.0.0.1:5500/admin/cardapio/";
            } else if (response.status === 403) {
              alert("Você não tem permissão para adicionar novos itens.");
            } else if (response.status === 401) {
              refreshToken().then(() => {
                const novoToken = localStorage.getItem("accessToken");
                options.headers.Authorization = `Bearer ${novoToken}`;
                enviarNovaCategoria();
              });
            } else if (response.status === 400) {
              console.log(response);
              return response.json();
            }
          })
          .then((response) => {
            const alert = document.querySelector(
              "#create-categoria .form-alert"
            );
            const string = response.nome[0];
            const novaString = string.charAt(0).toUpperCase() + string.slice(1);
            alert.innerHTML = novaString;
            console.log(novaString);
          });
      }
      enviarNovaCategoria();
    });
  }

  if (pratoFormulario) {
    pratoFormulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const alert = document.querySelector("#create-prato .form-alert");

      const nome = document.getElementById("create-prato-nome").value;
      const preco = document.getElementById("create-prato-preco").value;
      const descricao = document.getElementById("create-prato-desc").value;
      const imagem = document.getElementById("create-prato-imagem").files[0];
      const imageName = `${nome.toLowerCase().replace(/[ ]+/g, "-")}`;
      const params = new URLSearchParams(window.location.search);
      const categoria = +params.get("c");

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("preco", preco);
      formData.append("descricao", descricao);
      formData.append(
        "imagem",
        imagem,
        `${imageName}${imagem.name.substring(imagem.name.lastIndexOf("."))}`
      );
      formData.append("categoria", categoria);

      const token = localStorage.getItem("accessToken");

      let options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      function enviarNovoPrato() {
        fetch("http://127.0.0.1:8000/pratos/", options).then((response) => {
          if (response.ok) {
            window.location.href = `http://127.0.0.1:5500/admin/cardapio/categoria/?c=${categoria}`;
          } else if (response.status === 403) {
            alert("Você não tem permissão para adicionar novos itens.");
          } else if (response.status === 401) {
            refreshToken().then(() => {
              const novoToken = localStorage.getItem("accessToken");
              options.headers.Authorization = `Bearer ${novoToken}`;
              enviarNovoPrato();
            });
          } else if (response.status === 400) {
            console.log(response);
            return response.json();
          } else if (response.status === 415) {
            alert.innerHTML = "Arquivo de mídia não suportado";
          }
        });
      }
      enviarNovoPrato();
    });
  }
}
