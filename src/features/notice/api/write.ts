import fileAxios from "@/lib/fileAxios";

export const requeseWriteNotice = (param: WriteNoticeInfo) => {
  if (param.noticeId !== undefined && param.noticeId > 0) return fileAxios.put("/board/notice", param);
  else return fileAxios.post("/board/notice", param);
};
