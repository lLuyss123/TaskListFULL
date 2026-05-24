import { home, homeEvents } from "../views/home.js";
import { Login, loginEvents } from "../views/login.js";
import { register, registerEvents } from "../views/register.js";

const app = document.getElementById("app");

const routes = {
  "/": {
    render: home,
    events: homeEvents,
  },

  "/login": {
    render: Login,
    events: loginEvents,
  },

  "/register": {
    render: register,
    events: registerEvents,
  },
};

export function router() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route){
    console.log("no existe");
    
  }else{
    app.innerHTML = route.render();
    route.events();

  }

}

export function navigateTo(path) {
  history.pushState({}, "", path);
  router();
}