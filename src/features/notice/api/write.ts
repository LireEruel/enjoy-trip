import fileAxios from "@/lib/fileAxios";

export const requeseWriteNotice = (param: WriteNoticeInfo) => {
  return fileAxios.post("/board/notice", param);
};
