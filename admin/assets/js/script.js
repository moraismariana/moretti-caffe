import initListSizeStyle from "./modules/list-size-style.js";
import initModal from "./modules/modal.js";
import initIsLogged from "./modules/is-logged.js";
import initLogin from "./modules/login.js";
import initLogout from "./modules/logout.js";
import initGetObjectsAPI from "./modules/get-objects-api.js";
import initCreateObjectsAPI from "./modules/create-objects-api.js";
import initUpdateObjectsAPI from "./modules/update-objects-api.js";
import initDeleteObjectsAPI from "./modules/delete-objects-api.js";

initGetObjectsAPI();
initCreateObjectsAPI();
// initUpdateObjectsAPI();
initDeleteObjectsAPI();
// initListSizeStyle();
// initModal();
initIsLogged();
initLogin();
initLogout();
