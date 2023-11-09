import commonAxios from "@/lib/commonAxios";

export const requestDeleteNotice = (noticeId: number): Promise<Notice> => {
  return commonAxios.delete("/board/notice/" + noticeId);
};
