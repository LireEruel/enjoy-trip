import { createRouter, createWebHistory } from "vue-router";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

const setting: any = localStorage.getItem("user");

const routes =
  setting.user && setting.user.userInfo
    ? [...protectedRoutes, ...publicRoutes]
    : publicRoutes;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
