<script setup lang="ts">
import { RouterView } from "vue-router";
import AddPlanModal from "@/features/plan/components/AddPlanModal.vue";
</script>

<template>
  <div class="app">
    <router-view class="header" name="header" />
    <div class="contents">
      <router-view class="body" name="body" />
    </div>
    <router-view class="footer" name="footer" />
  </div>
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
