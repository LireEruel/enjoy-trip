import commonAxios from "@/lib/commonAxios";

export const requestGetNoticeDetail = (noticeId: number): Promise<Notice> => {
  return commonAxios.get("/board/notice/" + noticeId);
};
