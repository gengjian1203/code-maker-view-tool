import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "App",
    component: () => import("@/App.vue"),
    meta: {
      title: "首页",
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
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
