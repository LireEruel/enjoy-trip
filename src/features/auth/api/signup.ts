import commonAxios from "@/lib/commonAxios";
import type { JoinUser } from "../types";

export const requestSignUp = async (data: JoinUser) => {
  const res = await commonAxios.post("/user/join", data);
  console.log(res);
};
