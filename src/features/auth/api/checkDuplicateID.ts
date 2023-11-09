import commonAxios from "@/lib/commonAxios";

export const checkDuplicateID = (id: String) => {
  return commonAxios.get("/user/" + id);
};
