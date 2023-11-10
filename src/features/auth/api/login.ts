import commonAxios from "@/lib/commonAxios";
import type { LoginUser } from "../types";
import { MyInfo } from "@/types/user";

export const loginWithIdAndPassword = (data: LoginUser): Promise<MyInfo> => {
  return commonAxios.post("/user/login", data);
};
