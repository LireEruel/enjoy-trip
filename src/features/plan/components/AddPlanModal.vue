<template>
  <a-modal
    v-model:open="commonStore.isOpenAddPlanModal"
    :centered="true"
    :maskClosable="false"
    footer=""
    @cancel="onCloseModal"
  >
    <template #title>
      <LeftOutlined @click="goBefore" />
    </template>
    <h2 class="content-title">
      {{ step == 2 ? "언제 떠나시나요?" : "어디로 떠나시나요?" }}
    </h2>
    <div v-show="step !== 2" class="sido-selecter">
      <div class="button-container">
        <a-button
          v-for="sido in step == 0 ? sidoCodeList : gugunList"
          :key="sido.key"
          class="select-option"
          @click="() => onSelectedSido(sido.key)"
          :type="sido.key === addPlanState.sidoCode ? 'primary' : 'default'"
        >
          {{ sido.name }}
        </a-button>
      </div>
    </div>
    <div v-show="step == 2" class="range-selecter">
      <a-range-picker v-model:value="selectedRange" />

      <h2 class="content-title">이번 여행의 이름이 무엇인가요?</h2>
      <a-input v-model:value="addPlanState.title"></a-input>
    </div>
    <a-button
      v-show="step !== 0"
      @click="goNext"
      type="primary"
      class="next-btn"
      size="large"
      :loading="isLoading"
      >다음</a-button
    >
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";
import { computed, onMounted, ref } from "vue";
import { MasterPlanProp, PlanBase } from "../types";
import { sidoGugunMap, sidoCodeList } from "@/util/code";
import { LeftOutlined } from "@ant-design/icons-vue";
import type { Dayjs } from "dayjs";
import { requestCreateMasterPlan } from "../api";
import { useRouter } from "vue-router";
import { usePlanStore } from "@/stores/plan";

const router = useRouter();
const commonStore = useCommonStore();
const step = ref(0);
type RangeValue = [Dayjs, Dayjs];
const selectedRange = ref<RangeValue>();
const isLoading = ref(false);
const planStore = usePlanStore();
const addPlanState = ref<MasterPlanProp>({
  title: "",
  sidoCode: -1,
  gugunCode: -1,
  startDate: "",
  endDate: "",
});

onMounted(() => {
  resetPlanState();
});

const gugunList = computed(() => {
  const newGugunList = sidoGugunMap.find(
    (gugunInfo) => gugunInfo.sidoKey == addPlanState.value.sidoCode
  )?.gugunList;
  if (newGugunList) return [{ key: 0, name: "전체" }, ...newGugunList];
  else return [{ key: 0, name: "전체" }];
});

const onSelectedSido = (key: number) => {
  if (step.value == 0) {
    if (addPlanState.value.sidoCode == key) {
      addPlanState.value.sidoCode = -1;
    } else {
      addPlanState.value.sidoCode = key;
      step.value++;
    }
    addPlanState.value.gugunCode = -1;
  } else if (step.value == 1) {
    if (addPlanState.value.gugunCode == key) {
      addPlanState.value.gugunCode = -1;
    } else {
      addPlanState.value.gugunCode = key;
      step.value++;
    }
  }
};

const goBefore = () => {
  if (step.value > 0) {
    step.value--;
  }
};

const goNext = () => {
  if (step.value == 2) {
    if (selectedRange.value && addPlanState.value.title) {
      addPlanState.value.startDate =
        selectedRange.value[0].format("YYYY-MM-DD");
      addPlanState.value.endDate = selectedRange.value[1].format("YYYY-MM-DD");
      createMasterPlan();
    }
  } else {
    step.value++;
  }
};

const createMasterPlan = async () => {
  try {
    isLoading.value = true;
    const res = await requestCreateMasterPlan(addPlanState.value);

    const planBase: PlanBase = Object.assign({}, addPlanState.value, {
      planMasterId: res.planMasterId,
    });
    const sidoName = sidoCodeList.find(
      (code) => code.key == addPlanState.value.sidoCode
    )?.name;
    const gugunName = gugunList.value.find(
      (code) => code.key == addPlanState.value.gugunCode
    )?.name;
    planBase.sidoName = sidoName;
    planBase.gugunName = gugunName;
    planStore.currentPlan = planBase;

    commonStore.isOpenAddPlanModal = false;
    router.push({
      name: "editPlan",
    });
  } finally {
    isLoading.value = false;
  }
};

const resetPlanState = () => {
  addPlanState.value = {
    title: "",
    sidoCode: -1,
    gugunCode: -1,
    startDate: "",
    endDate: "",
  };
  step.value = 0;
  selectedRange.value = undefined;
};

const onCloseModal = () => {
  resetPlanState();
};
</script>

<style scoped lang="scss">
@import "@/assets/_colors.scss";
.content-title {
  box-sizing: border-box;
  width: 100%;
  padding: 24px 0px 30px 0px;
  font-size: 28px;
  font-weight: 500;
  line-height: 41px;
  color: $gray-10;
  letter-spacing: -0.56px;
  word-break: break-all;
  white-space: pre-wrap;
}

.selected {
  background-color: $primary;
  color: white;
}

.button-container {
  height: 25rem;
  overflow-y: scroll;
  margin: 0 !important;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 개의 동일한 크기의 열 */
  gap: 16px;
}
.select-option {
  width: 100%;
  height: 5rem;
}
.next-btn {
  width: 100%;
}

.range-selecter {
  height: 15rem;
}
</style>
