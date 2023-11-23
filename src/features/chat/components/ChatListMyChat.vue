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
    display: block;
    overflow: hidden;
    position: relative;
    padding: 8px 12px;
    word-wrap: break-word;
    word-break: break-word;
    color: white;
    border-radius: 1rem;
    background-color: $primary;
  }
}
</style>
