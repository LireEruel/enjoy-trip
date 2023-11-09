import commonAxios from "@/lib/commonAxios";

export const requestGetNoticeList = (
  pgno: number,
  title: String
): Promise<NoticeListInfo> => {
  return commonAxios.get("/board/notice/list", {
    params: {
      pgno: pgno,
      title: title,
    },
  });
};
