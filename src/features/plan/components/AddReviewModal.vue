<template>
  <a-modal
    v-model:open="commonStore.isOpenAddReviewModal"
    :centered="true"
    :maskClosable="false"
    footer=""
    @cancel="onCloseModal"
  >
    응애 모달
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";

import { onMounted } from "vue";

const commonStore = useCommonStore();
const onCloseModal = () => {
  commonStore.isOpenAddReviewModal = false;
};

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
