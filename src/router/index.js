import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../views/Main.vue";
import Product from "../components/Product.vue";

const routes = [
  {
    path: "/",
    name: "iMain",
    component: Main,
  },
  {
    path: "/form",
    name: "iForm",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Form.vue"),
    props: true
  },
  {
    path: "/product/:id",
    name: "Id",
    component: Product,
    props: true
  },
  // 404 redirect to home
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
