import commonAxios from "@/lib/commonAxios";

export const requestGetMessage = () => {
  return commonAxios.get("/chats/messages");
};
