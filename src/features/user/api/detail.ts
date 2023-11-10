import commonAxios from "@/lib/commonAxios";

export const requestGetInviteKey = (cusNo: number): Promise<string> => {
  return commonAxios.get("/user/invitekey/" + cusNo);
};

