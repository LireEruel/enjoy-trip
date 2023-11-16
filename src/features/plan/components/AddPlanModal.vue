<template>
  <a-modal v-model:open="isOpenAddPlanModal">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();
const isOpenAddPlanModal = commonStore.isOpenAddPlanModal;
</script>

<style scoped lang="scss"></style>
