import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/Container",
    component: () => import("@/views/Container.vue"),
    meta: {
      title: "常用工具",
    },
  },
  // {
  //   path: "/Home",
  //   name: "Home",
  //   component: () => import("@/views/Home.vue"),
  //   meta: {
  //     title: "首页",
  //   },
  // },
  // {
  //   path: "/About",
  //   name: "About",
  //   component: () => import("@/views/About.vue"),
  //   meta: {
  //     title: "首页",
  //   },
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
