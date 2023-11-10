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
  p {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 1rem 1rem 1rem 0;
    display: flex;
    display: inline-block;
  }
}
</style>
