import commonAxios from "@/lib/commonAxios";
import { EditUserInfoParam } from "..";

export const requestEditUser = (param: EditUserInfoParam): Promise<string> => {
  return commonAxios.put("/user", param);
};
