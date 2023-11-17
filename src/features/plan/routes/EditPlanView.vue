<template>
  <div>
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
                    <div class="daily-plan-content">
                      <div class="day-count">
                        <font-awesome-icon icon="paper-plane" />
                        <span> Day{{ index + 1 }}</span>
                      </div>
                      <div class="date">
                        {{ dayjs(dailyPlan.planDate).format("YYYY.MM.DD") }}
                      </div>
                    </div>
                    <div class="btn-wrap">
                      <button
                        @click="
                          () => onClickAddCourceBtn(dailyPlan.dailyPlanId)
                        "
                      >
                        장소 추가
                      </button>
                      <button>메모 추가</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <AddCourseModal
      :open="isOpenAddCourseModal"
      :sido-code="planBase?.sidoCode ? planBase?.sidoCode : -1"
      :gugun-code="planBase?.gugunCode ? planBase?.gugunCode : -1"
      @onClose="onCloseAddCourseModal"
    />
  </div>
</template>

<script setup lang="ts">
import { keywordSearch, mountMap } from "@/lib/mapUtli.js";
import { onMounted, ref } from "vue";
import { requestGetMasterPlan } from "../api/createPlan.js";
import { usePlanStore } from "@/stores/plan";
import { PlanDaily } from "..";
import * as dayjs from "dayjs";
import AddCourseModal from "../components/AddCourseModal.vue";

let map: null = null;
const isLoadingMap = ref(true);
const planStore = usePlanStore();
const planBase = planStore.currentPlan;
const dailyPlanList = ref<PlanDaily[]>([]);
const isOpenAddCourseModal = ref(false);
const selectedDay = ref(-1);

let destination = "";

onMounted(() => {
  mountMap(map, 37.566826, 126.9786567, 2);
  setMiddle();
  getinitialData();
  setDestination();
});

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

const onClickAddCourceBtn = (dailyPlanId: number) => {
  isOpenAddCourseModal.value = true;
  selectedDay.value = dailyPlanId;
};

const onCloseAddCourseModal = () => {
  isOpenAddCourseModal.value = false;
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
  .daily-plan-content {
    height: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 2rem;
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
  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 2rem;
    button {
      border-radius: 12px;
      background: linear-gradient(145deg, #ffffff, #e6e6e6);
      box-shadow:
        7px 7px 11px #dbdbdb,
        -7px -7px 11px #ffffff;
      border: none;
      padding: 1rem;
      color: $gray-10;
      &:hover {
        border-radius: 12px;
        background: #ffffff;
        box-shadow:
          7px 7px 11px #dbdbdb,
          -7px -7px 11px #ffffff;
      }
      &:active {
        border-radius: 14px;
        background: linear-gradient(145deg, #e6e6e6, #ffffff);
        box-shadow:
          8px 8px 17px #dbdbdb,
          -8px -8px 17px #ffffff;
      }
    }
  }
}
</style>
