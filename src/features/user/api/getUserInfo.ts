import commonAxios from "@/lib/commonAxios";
import { User } from "@/types/user";

export const getUserInfo = (cusNo: number): Promise<User> => {
  return commonAxios.get("/user/view/" + cusNo);
};
