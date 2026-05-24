import "./styles/global.css";
import { router } from "./router/routes.js";

router();

window.addEventListener("popstate", router);

