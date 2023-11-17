<template>
  <a-modal :open="open" title="추천 장소" @cancel="emit('onClose')">
    <a-input-group compact>
      <a-select v-model:value="selectedOption">
        <a-select-option value="Option1">Option1</a-select-option>
        <a-select-option value="Option2">Option2</a-select-option>
      </a-select>
      <a-input v-model:value="inputText" style="width: 50%" />
    </a-input-group>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { open } = defineProps<{ open: boolean }>();
const emit = defineEmits(["onClose"]);

const selectedOption = ref(0);
const inputText = ref("");
</script>

<style scoped lang="scss"></style>
