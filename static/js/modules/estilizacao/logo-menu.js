export default function initLogoMenu() {
  const logoMenu = document.querySelector("[data-logo-menu]");

  if (logoMenu) {
    function updateImageSrc() {
      const logoUrl = window.LOGO_URL;
      if (window.innerWidth <= 480) {
        logoMenu.src = `${logoUrl}Logo-pequena.svg`;
      } else {
        logoMenu.src = `${logoUrl}Logo.svg`;
      }
    }
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
  }
}
