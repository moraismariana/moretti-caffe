export default async function createFittedImage(arquivo, altura, largura) {
  /* Função que recebe como parâmetros:
    - Um arquivo de imagem
    - Altura em pixels
    - Largura em pixels
    A função encaixa a imagem na altura e largura pré-definida, centralizando e cortando a imagem de forma semelhande ao object-fit: civer no CSS.
    A função retorna uma URL base64 do tipo webp. */

  return new Promise((resolve, reject) => {
    if (!arquivo) {
      reject(new Error("Nenhum arquivo foi fornecido."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const aspectRatio = Math.max(largura / img.width, altura / img.height);

        const novaLargura = img.width * aspectRatio;
        const novaAltura = img.height * aspectRatio;
        const offsetX = (novaLargura - largura) / 2;
        const offsetY = (novaAltura - altura) / 2;

        canvas.width = largura;
        canvas.height = altura;

        ctx.drawImage(img, -offsetX, -offsetY, novaLargura, novaAltura);

        resolve(canvas.toDataURL("image/webp"));
      };

      img.onerror = () => {
        reject(new Error("Erro ao carregar a imagem."));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo."));
    };

    reader.readAsDataURL(arquivo);
  });
}
