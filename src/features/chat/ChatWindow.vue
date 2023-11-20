<template>
  <div v-show="props.isOpen" class="chat-window">
    <header>
      <div />
      <h3>{{ userInfo?.partnerName }}</h3>
      <CloseOutlined @click="emit('close-chat')" />
    </header>
    <chat-list :chat-list="chatArray"></chat-list>
    <a-input-group compact class="input-wrap">
      <a-input
        v-model:value="inputChat"
        :bordered="false"
        @keyup.enter="handleSubmit"
      />
      <a-button
        shape="circle"
        :icon="h(SendOutlined)"
        type="primary"
        @click="handleSubmit"
      />
    </a-input-group>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { CloseOutlined, SendOutlined } from "@ant-design/icons-vue";
import { ChatList } from "./components";
import { h, onMounted, ref } from "vue";
import { Chat } from "./types";
import * as StompJs from "@stomp/stompjs";
import { MyInfo } from "@/types/user";

const client: any = {};
const userStore = useUserStore();
const userInfo = ref<undefined | MyInfo>(userStore.userInfo);
const props = defineProps({ isOpen: { type: Boolean, required: true } });
const emit = defineEmits(["close-chat"]);

const inputChat = ref("");
const chatArray = ref<Chat[]>([
  {
    senderNo: 4,
    sendTime: "ss",
    content: "안녕",
  },
  {
    senderNo: 5,
    sendTime: "ss",
    content: "ㅎㅇㅎㅇ",
  },
]);
onMounted(() => {
  connect();
});

const connect = () => {
  if (userInfo.value)
    client.current = new StompJs.Client({
      brokerURL: import.meta.env.VITE_SERVER_SOCKET_URL + "/ws",
      connectHeaders: { Authorization: userInfo.value?.accessToken },
      onConnect: () => {
        console.log("success");
        subscribe();
      },
    });
  client.current.activate();
};
const subscribe = () => {
  client.current.subscribe(`/sub/1`, (body: any) => {
    const json_body = JSON.parse(body.body);
    chatArray.value = [...chatArray.value, json_body];
  });
};

const handleSubmit = (e: Event) => {
  // 보내기 버튼 눌렀을 때 publish
  e.preventDefault();
  if (inputChat.value.length == 0) {
    alert("메세지를 입력해 주세요");
    return;
  }
  publish(inputChat.value);
};

const publish = (message: string) => {
  console.log(client.current.connected);
  if (!client.current.connected) return; // 연결되지 않았으면 메시지를 보내지 않는다.

  if (userInfo.value?.cusNo)
    client.current.publish({
      destination: `/pub/chats/messages/1`,
      body: JSON.stringify({
        roomId: 1,
        senderId: userInfo?.value.cusNo,
        content: message,
      }),
    });
  inputChat.value = "";
};
</script>

<style scoped lang="scss">
$blue-1: #e6f4ff;
.chat-window {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 999;
  overflow: hidden;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: $blue-1;
  padding: 0 1em;
  h3 {
    font-size: 1rem;
  }
}

.input-wrap {
  position: absolute;
  bottom: 0;
  border-top: 1px solid #f0f0f0;
  padding: 0.5em;
  input {
    width: calc(100% - 2rem);
  }
}
</style>
