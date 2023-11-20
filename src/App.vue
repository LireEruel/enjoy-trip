<template>
  <div class="app">
    <router-view
      @on-click-chat-btn="onClickChatBtn"
      class="header"
      name="header"
    />
    <div class="contents">
      <router-view class="body" name="body" />
    </div>
    <router-view class="footer" name="footer" />
  </div>
  <chat-window :is-open="isOpenChat" @close-chat="onCloseChat"></chat-window>
  <add-plan-modal></add-plan-modal>
</template>

<style lang="scss" scoped>
.app {
  color: rgba(0, 0, 0, 0.85);
  width: 100%;
  height: 100%;
}

.contents {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100% - 110px);
  min-width: 600px;
}
</style>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { ChatWindow } from "./features/chat";
import { ref, watchEffect } from "vue";
import AddPlanModal from "@/features/plan/components/AddPlanModal.vue";
import { useUserStore } from "./stores/user";
import { connect } from "./features/chat/socket/socket";

const isOpenChat = ref(false);
const userStore = useUserStore();
const userInfo = userStore.userInfo;

watchEffect(() => {
  if (userInfo) {
    connect();
  }
});
const onClickChatBtn = () => {
  isOpenChat.value = !isOpenChat.value;
};

const onCloseChat = () => {
  isOpenChat.value = false;
};
</script>
