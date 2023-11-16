<template>
  <a-modal
    v-model:open="commonStore.isOpenAddPlanModal"
    :centered="true"
    :maskClosable="false"
  >
    <h2 class="content-title">
      {{ step == 2 ? "언제 떠나시나요?" : "어디로 떠나시나요?" }}
    </h2>
    <div v-show="step == 0">
      <ul>
        <a-row :gutter="24">
          <a-col :span="12" v-for="sido in sidoCodeList" :key="sido.key">
            <li
              @click="() => onSelectedSido(sido.key)"
              v-bind:class="{ selected: sido.key === addPlanState.sidoCode }"
            >
              {{ sido.name }}
            </li>
          </a-col>
        </a-row>
      </ul>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";
import { ref } from "vue";
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

const onSelectedSido = (key: number) => {
  if (addPlanState.value.sidoCode == key) {
    addPlanState.value.sidoCode = -1;
  } else {
    addPlanState.value.sidoCode = key;
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
ul {
}

li {
  list-style: none;
}
</style>
