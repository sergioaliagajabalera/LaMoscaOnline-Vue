import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Principal from "../views/Principal.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/principal",
    name: "Principal",
    component: Principal,
  },
  {
    path: "/Room",
    name: "Room",
    component: () =>
      import(/* webpackChunkName: "Room" */ "../views/Room.vue"),
  },
  {
    path: "/Game",
    name: "Game",
    component: () =>
      import(/* webpackChunkName: "Game" */ "../views/Game.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
