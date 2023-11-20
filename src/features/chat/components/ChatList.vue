<template>
  <div class="chat-list">
    <div v-for="(chat, index) in props.chatList" :key="index">
      <chat-list-my-chat
        v-if="userInfo?.cusNo == chat.senderNo"
        :chat="chat"
      ></chat-list-my-chat>
      <chat-list-partner-chat v-else :chat="chat"></chat-list-partner-chat>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { Chat } from "../types";
import { ChatListMyChat, ChatListPartnerChat } from "./";
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const props = defineProps({
  chatList: Array<Chat>,
});
console.log(props);
</script>

<style scoped lang="scss">
.chat-list {
  display: flex;
  gap: 2%;
  flex-direction: column;
  padding: 2%;
}
</style>
