import { TheHeader, TheFooter } from "@/components/layouts";
import { AttractionListView } from "@/features/attraction";
import LoginViewVue from "@/features/auth/routes/LoginView.vue";
import { LandingView } from "@/features/landing";
import { NoticeLookupView, NoticeWriteView } from "@/features/notice";
import { UserInfoView } from "@/features/user";
import { createRouter, createWebHistory } from "vue-router";

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
    {
      path: "/user/detail/:cusNo",
      name: "userInfo",
      components: {
        header: TheHeader,
        body: UserInfoView,
        footer: TheFooter,
      },
      props: true,
    },
    {
      path: "/attraction/list",
      name: "attractions",
      components: {
        header: TheHeader,
        body: AttractionListView,
        footer: TheFooter,
      },
    },
  ],
});

export default router;
