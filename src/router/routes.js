import { home, homeEvents } from "../views/home.js";
import { Login, loginEvents } from "../views/login.js";
import { register, registerEvents } from "../views/register.js";
import { notFound, notFoundEvents } from "../views/not-found.js";

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
    app.innerHTML= notFound()
    notFoundEvents()
  }else{
    app.innerHTML = route.render();
    route.events();

  }

}

export function navigateTo(path) {
  history.pushState({}, "", path);
  router();
}