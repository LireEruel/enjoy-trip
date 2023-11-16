<template>
  <a-modal
    v-model:open="commonStore.isOpenAddPlanModal"
    :centered="true"
    :maskClosable="false"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();
</script>

<style scoped lang="scss"></style>
