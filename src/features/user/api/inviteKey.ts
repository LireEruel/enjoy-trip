import commonAxios from "@/lib/commonAxios";

export const requestGetInviteKey = (): Promise<string> => {
  return commonAxios.get("/user/invitekey");
};
