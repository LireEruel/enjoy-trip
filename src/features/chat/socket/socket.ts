import * as StompJs from "@stomp/stompjs";

const client: any = {};
export const connect = (accessToken: string) => {
  client.current = new StompJs.Client({
    brokerURL: import.meta.env.VITE_SERVER_SOCKET_URL + "/ws",
    connectHeaders: { Authorization: accessToken },
    onConnect: () => {
      console.log("success");
    },
  });
  client.current.activate();
};
