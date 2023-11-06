import commonAxios from "lib/commonAxios";
import type { LoginUser } from "../types";

export const loginWithIdAndPassword = (data: LoginUser) => {
  return commonAxios.post("/user/login", data);
};
