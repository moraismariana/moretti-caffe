export default function initHasFileInput() {
  const createPratoInput = document.getElementById("create-prato-imagem");

  if (createPratoInput) {
    createPratoInput.addEventListener("change", () => {
      if (createPratoInput.files && createPratoInput.files.length > 0) {
        createPratoInput.classList.add("has-file");
      }
    });
  }
}
