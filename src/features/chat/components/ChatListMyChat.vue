<template>
  <div class="chat-message">
    <p>{{ props.chat.content }}</p>
  </div>
</template>
<script setup lang="ts">
import type { Chat } from "../types";

const props = defineProps<{ chat: Chat }>();
</script>

<style scoped lang="scss">
.chat-message {
  display: flex;
  justify-content: flex-end;
  p {
    background-color: #1890ff;
    padding: 1rem;
    border-radius: 1rem 1rem 0 1rem;
    display: flex;
    display: inline-block;
  }
}
</style>
