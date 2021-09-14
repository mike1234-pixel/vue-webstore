import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../views/Main.vue";
import Form from "../components/Form.vue";

const routes = [
  {
    path: "/",
    name: "iMain",
    component: Main,
  },
  {
    path: "/form",
    name: "Form",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Form.vue"),
    props: true
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
