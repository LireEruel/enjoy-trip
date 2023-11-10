<template>
  <div v-show="props.isOpen" class="chat-window">
    <header>
      <div />
      <h3>{{ userInfo?.partnerName }}</h3>
      <CloseOutlined @click="emit('close-chat')" />
    </header>
    <chat-list :data-source="dataSource"></chat-list>
    <a-input-group compact class="input-wrap">
      <a-input v-model:value="inputChat" :bordered="false" />
      <a-button shape="circle" :icon="h(SendOutlined)" type="primary" />
    </a-input-group>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { CloseOutlined, SendOutlined } from "@ant-design/icons-vue";
import { ChatList } from "./components";
import { h, ref } from "vue";
import { Chat } from "./types";
const props = defineProps({ isOpen: { type: Boolean, required: true } });
const emit = defineEmits(["close-chat"]);
const dataSource = ref<Chat[]>([
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
const inputChat = ref("");

const userStore = useUserStore();
const userInfo = userStore.userInfo;
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
