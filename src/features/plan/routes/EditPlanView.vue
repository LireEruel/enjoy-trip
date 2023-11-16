<template>
  <a-row justify="center">
    <a-col span="20">
      <div class="root">
        <a-spin :spinning="isLoadingMap">
          <div id="map"></div>
        </a-spin>
        <div class="right-side">
          <a-page-header
            :title="planBase?.title"
            :sub-title="`${planBase?.startDate} - ${planBase?.endDate}`"
            @back="() => null"
          >
          </a-page-header>
          <div class="destination">
            <div class="plan-main">
              <div class="sub-title">
                <div class="icon-wrap">
                  <font-awesome-icon icon="location-dot" flip class="icon" />
                </div>
                <p>{{ `${planBase?.sidoName} ${planBase?.gugunName}` }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { keywordSearch, mountMap } from "@/lib/mapUtli.js";
import { onMounted, ref } from "vue";
import { requestGetMasterPlan } from "../api/creatPlan";
import { usePlanStore } from "@/stores/plan";

let map: null = null;
const isLoadingMap = ref(true);
const planStore = usePlanStore();
const planBase = planStore.currentPlan;

console.log(planBase);

onMounted(() => {
  mountMap(map, 37.566826, 126.9786567, 2);
  setMiddle();
  getinitialData();
});

const setMiddle = () => {
  isLoadingMap.value = true;
  const res = keywordSearch("대구");
  if (res) {
    isLoadingMap.value = false;
  } else {
    setTimeout(() => {
      setMiddle();
    }, 100);
  }
};

const getinitialData = async () => {
  try {
    if (planBase) {
      const res = await requestGetMasterPlan(planBase.planMasterId);
      console.log(res);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped lang="scss">
.root {
  display: flex;
  gap: 2%;
  #map {
    width: 40vw;
    height: 800px;
    border-radius: 1rem;
  }
}

.right-side {
  width: 100%;
}

.plan-main {
  padding: 2rem;
}

.sub-title {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  .icon-wrap {
    display: inline-block;
    padding: 1rem;
    background-color: $blue-1;
    border-radius: 1rem;
    .icon {
      color: $primary;
      font-size: 1.2rem;
    }
  }
  p {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>
