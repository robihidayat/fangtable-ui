import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Take from "./views/Take.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/take",
      name: "take",
      component: Take
    }
  ]
});
