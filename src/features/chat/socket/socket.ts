import * as StompJs from "@stomp/stompjs";

const client: any = {};
export const connect = (accessToken: string) => {
  client.current = new StompJs.Client({
    brokerURL: process.env.REACT_APP_CHAT_API,
    connectHeaders: { Authorization: accessToken },
    onConnect: () => {
      console.log("success");
    },
  });
  client.current.activate();
};
