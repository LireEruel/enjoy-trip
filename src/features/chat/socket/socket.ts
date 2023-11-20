import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

let connected = false;
export const connect = () => {
  const serverURL = "http://219.255.6.129:23333/ws";
  let socket = new SockJS(serverURL);
  console.log(socket);
  const stompClient = Stomp.over(socket);
  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);

  stompClient.connect(
    {},
    (frame) => {
      connected = true;
      console.log("소켓 연결 성공", frame);
      stompClient.subscribe("/send", (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);
        //recvList.push(JSON.parse(res.body));
      });
    },
    (error) => {
      console.log("소켓 연결 실패", error);
      connected = false;
    }
  );
};
