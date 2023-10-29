import commonAxios from "lib/commonAxios";
import type { JoinUser } from "../types";

export const requestSignUp = async (data: JoinUser) => {
  const res = await commonAxios.post("/auth/join", data);
  console.log(res);
};
