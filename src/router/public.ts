import { TheFooter, TheHeader } from "@/components/layouts";
import {
  AttractionListView,
  AttractionDetailView,
} from "@/features/attraction";
import LoginViewVue from "@/features/auth/routes/LoginView.vue";
import { LandingView } from "@/features/landing";
import { NoticeLookupView, NoticeDetailLookUpView } from "@/features/notice";
import { UserInfoView } from "@/features/user";

export const publicRoutes = [
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
    path: "/notice/detail/:noticeId",
    name: "noticeDetail",
    components: {
      header: TheHeader,
      body: NoticeDetailLookUpView,
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
  {
    path: "/attraction/:contentId",
    name: "attractionDetail",
    components: {
      header: TheHeader,
      body: AttractionDetailView,
      footer: TheFooter,
    },
    props: true,
  },
];
