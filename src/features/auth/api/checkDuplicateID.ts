import commonAxios from "@/lib/commonAxios";

export const checkDuplicateID = (id: String): Promise<number> => {
  return commonAxios.get("/user/" + id);
};
