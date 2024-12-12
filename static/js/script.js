import initMenuMobile from "./modules/estilizacao/menu-mobile.js";
import initLogoMenu from "./modules/estilizacao/logo-menu.js";
import initScrollEffect from "./modules/estilizacao/scroll-effect.js";
import initGetAPICardapio from "./modules/api/get-api-cardapio.js";
import initEstatisticas from "./modules/api/estatisticas.js";

sessionStorage.setItem("teste", "teste");
console.log(sessionStorage);

initMenuMobile();
initLogoMenu();
initScrollEffect();
initGetAPICardapio();
initEstatisticas();
