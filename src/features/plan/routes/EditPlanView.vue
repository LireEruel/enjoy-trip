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
                <p>{{ destination }}</p>
              </div>
              <div>
                <div
                  v-for="(dailyPlan, index) in dailyPlanList"
                  :key="dailyPlan.dailyPlanId"
                  class="daily-plan"
                >
                  <p>
                    <div class="day-count">
                      <font-awesome-icon icon="paper-plane" />
                      <span> Day{{ index + 1 }}</span>
                    </div>
                    <div class="date">
                      {{ dailyPlan.planDate }}
                    </div>
                  </p>
                  <div>
                    <a-button>장소 추가</a-button>
                    <a-button>메모 추가</a-button>
                  </div>
                </div>
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
import { PlanDaily } from "..";

let map: null = null;
const isLoadingMap = ref(true);
const planStore = usePlanStore();
const planBase = planStore.currentPlan;
const dailyPlanList = ref<PlanDaily[]>([]);
let destination = "";

console.log(planBase);

onMounted(() => {
  mountMap(map, 37.566826, 126.9786567, 2);
  setMiddle();
  getinitialData();
  setDestination();
});

const setDestination = () => {
  if (planBase && planBase.sidoName) {
    destination += planBase.sidoName;
    if (planBase.gugunName) {
      destination += " " + planBase.gugunName;
    }
  }
};

const setMiddle = () => {
  isLoadingMap.value = true;
  const res = keywordSearch(destination);
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
      dailyPlanList.value = res;
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

.daily-plan {
  & > p {
    height: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    .day-count {
      display: flex;
      width: auto;
      height: 31px;
      -webkit-box-align: center;
      align-items: center;
      padding: 6px 10px;
      box-sizing: border-box;
      background: $gray-10;
      color: white;
      font-weight: 600;
      border-radius: 20px;
      gap: 0.5em;
      span {
        font-weight: 600;
        font-size: 13px;
        line-height: 19px;
        margin-left: 3px;
        color: rgb(255, 255, 255);
      }
    }

    .date {
      width: auto;
      height: 31px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-left: 21px;
      font-weight: 400;
      font-size: 13px;
      line-height: 31px;
      color: rgb(106, 106, 106);
      position: relative;
      &::before {
        display: block;
        content: "";
        width: 1px;
        height: 10px;
        background: rgb(219, 219, 219);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -10px;
      }
    }
  }
}
</style>
