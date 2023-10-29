import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import DefaultHeader from "../components/layouts/DefaultHeader.vue";
import DefaultFooter from "../components/layouts/DefaultFooter.vue";
import LoginViewVue from "features/auth/routes/LoginView.vue";
import NoticeLookupViewVue from "features/notice/routes/NoticeLookupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: DefaultHeader,
        body: HelloWorld,
        footer: DefaultFooter,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: DefaultHeader,
        body: LoginViewVue,
        footer: DefaultFooter,
      },
    },
    {
      path: "/notice",
      name: "notice",
      components: {
        header: DefaultHeader,
        body: NoticeLookupViewVue,
        footer: DefaultFooter,
      },
    },
  ],
});

export default router;
