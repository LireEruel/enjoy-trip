import { TheFooter, TheHeader } from "@/components/layouts";
import { NoticeWriteView } from "@/features/notice";
import { EditPlanView, EditReviewView } from "@/features/plan";

export const protectedRoutes = [
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
    path: "/plan/edit/:planMasterId",
    name: "editPlan",
    components: {
      header: TheHeader,
      body: EditPlanView,
      footer: TheFooter,
    },
    props: true,
  },
  {
    path: "/review/edit/:planMasterId",
    name: "editReview",
    components: {
      header: TheHeader,
      body: EditReviewView,
      footer: TheFooter,
    },
    props: true,
  },
];
