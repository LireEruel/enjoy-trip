import fileAxios from "lib/fileAxios";

export const requestAddNoticeList = (
  param: WriteNoticeListInfo
): Promise<NoticeListInfo> => {
  return fileAxios.post("/board/notice", param);
};
