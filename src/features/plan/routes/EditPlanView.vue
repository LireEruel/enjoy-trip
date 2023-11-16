<template>
  <a-row justify="center">
    <a-col span="20">
      <div class="root">
        <a-spin :spinning="isLoadingMap">
          <div id="map"></div>
        </a-spin>
        <div class="right-side">
          <div class="main-info">
            <a-page-header
              title="한국 여행 일정"
              sub-title="(3일)"
              @back="() => null"
            >
            </a-page-header>
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

let map: null = null;
const isLoadingMap = ref(true);
const props = defineProps<{ planMasterId: string }>();
const planMasterId = +props.planMasterId;
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
    const res = await requestGetMasterPlan(planMasterId);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped lang="scss">
.root {
  display: flex;

  #map {
    width: 600px;
    height: 800px;
  }
}

.right-side {
  width: 100%;
}

.main-info {
  position: fixed;
  z-index: 10;
  top: 60px;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background-color: white;
}
</style>
