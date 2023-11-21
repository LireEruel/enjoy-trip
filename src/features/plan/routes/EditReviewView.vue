<template>
  <div class="root" v-if="masterPlanInfo !== null">
    <div class="header">
      <div></div>
      <div class="title">
        <h1>{{ masterPlanInfo.title }}</h1>
        <p>
          {{ dayjs(masterPlanInfo.startDate).format("YYYY.MM.DD") }} -
          {{ dayjs(masterPlanInfo.endDate).format("YYYY.MM.DD") }}
        </p>
      </div>
      <div class="actions-wrap">
        <ShareAltOutlined />
        <HeartOutlined />
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane v-for="i in 10" :key="i" :tab="`Tab-${i}`"
        >Content of tab {{ i + 1 }}</a-tab-pane
      >
    </a-tabs>
  </div>
  <div v-else>
    <a-skeleton></a-skeleton>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { MasterPlan, requestGetMasterPlan } from "..";
import { onMounted, ref } from "vue";

const { planMasterId } = defineProps<{ planMasterId: number }>();
const masterPlanInfo = ref<MasterPlan | null>(null);
const activeKey = ref(1);
onMounted(async () => {
  console.log(planMasterId);
  masterPlanInfo.value = await requestGetMasterPlan(planMasterId);
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-around;
  .title {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    h1 {
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .actions-wrap {
    display: flex;
    gap: 2rem;
  }
}
</style>
