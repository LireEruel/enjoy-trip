import fileAxios from "@/lib/fileAxios";

export const uploadFile = (type: string, file: any) => {
  return fileAxios.post(`/file/upload/${type}`, file);
};
