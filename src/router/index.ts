import { createRouter, createWebHistory } from "vue-router";
import DefaultHeader from "../components/layouts/DefaultHeader.vue";
import DefaultFooter from "../components/layouts/DefaultFooter.vue";
import LoginViewVue from "features/auth/routes/LoginView.vue";
import { NoticeLookupView, NoticeWriteView } from "features/notice/routes";
import { LandingView } from "features/landing";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: DefaultHeader,
        body: LandingView,
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
        body: NoticeLookupView,
        footer: DefaultFooter,
      },
    },
    {
      path: "/notice/write",
      name: "noticeWrite",
      components: {
        header: DefaultHeader,
        body: NoticeWriteView,
        footer: DefaultFooter,
      },
    },
  ],
});

export default router;
