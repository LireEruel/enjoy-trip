import { createRouter, createWebHistory } from "vue-router";
import { TheFooter, TheHeader } from "components/layouts";
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
        header: TheHeader,
        body: LandingView,
        footer: TheFooter,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: TheHeader,
        body: LoginViewVue,
        footer: TheFooter,
      },
    },
    {
      path: "/notice",
      name: "notice",
      components: {
        header: TheHeader,
        body: NoticeLookupView,
        footer: TheFooter,
      },
    },
    {
      path: "/notice/write/:noticeId",
      name: "noticeWrite",
      components: {
        header: TheHeader,
        body: NoticeWriteView,
        footer: TheFooter,
      },
      props: true,
    },
    {
      path: "/notice/detail/:noticeId",
      name: "noticeDetail",
      components: {
        header: TheHeader,
        body: NoticeLookupView,
        footer: TheFooter,
      },
      props: true,
    },
  ],
});

export default router;
