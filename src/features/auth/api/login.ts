import commonAxios from "lib/commonAxios";
import type { UserResponse } from "../types";

export type LoginCredentialsDTO = {
    userId : string,
    userPass : string
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return commonAxios.post("/auth/login", data);
};