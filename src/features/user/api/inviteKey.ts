import commonAxios from "@/lib/commonAxios";

export const requestGetInviteKey = (): Promise<string> => {
  return commonAxios.get("/relation");
};

export const requestSubmitInviteKey = (key: string) => {
  return commonAxios.post("/relation/" + key);
};
