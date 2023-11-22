import commonAxios from "@/lib/commonAxios";

export const requestRemoveFile = (fileId: number) => {
  return commonAxios.delete("file/" + fileId);
};
