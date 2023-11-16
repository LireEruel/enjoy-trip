<template>
  <a-modal
    v-model:open="commonStore.isOpenAddPlanModal"
    :centered="true"
    :maskClosable="false"
    footer=""
  >
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
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";
import { computed, ref } from "vue";
import { InitialPlanProp } from "../types";
import { sidoGugunMap, sidoCodeList } from "@/util/code";
const commonStore = useCommonStore();
const step = ref(0);

const addPlanState = ref<InitialPlanProp>({
  title: "",
  sidoCode: -1,
  gugunCode: -1,
  startDate: "",
  endDate: "",
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
  } else if (step.value == 1) {
    if (addPlanState.value.gugunCode == key) {
      addPlanState.value.gugunCode = -1;
    } else {
      addPlanState.value.gugunCode = key;
      step.value++;
    }
  }
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
</style>
