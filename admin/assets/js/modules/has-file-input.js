export default function initHasFileInput() {
  const createPratoInput = document.getElementById("create-prato-imagem");

  if (createPratoInput) {
    createPratoInput.addEventListener("change", () => {
      if (createPratoInput.files && createPratoInput.files.length > 0) {
        createPratoInput.classList.add("has-file");
      }
    });
  }

  const updatePratoInput = document.getElementById("update-prato-imagem");

  if (updatePratoInput) {
    updatePratoInput.addEventListener("change", () => {
      if (updatePratoInput.files && updatePratoInput.files.length > 0) {
        updatePratoInput.classList.add("has-file");
      }
    });
  }
}
