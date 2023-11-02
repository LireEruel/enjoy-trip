import commonAxios from "lib/commonAxios";

export const requestAddNoticeList = (
  param: WriteNoticeListInfo
): Promise<NoticeListInfo> => {
  return commonAxios.post("/board/notice", param);
};
