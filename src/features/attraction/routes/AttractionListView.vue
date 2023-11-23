<template>
  <div class="root">
    <div class="heading">
      <h1>{{ sidoList[selectedSido].name }}의 명소 알아보기</h1>
      <a-space align="center" class="option-bar">
        <a-select
          v-model:value="selectedSido"
          style="width: 120px"
          :options="sidoList"
          :field-names="{ label: 'name', value: 'key' }"
          size="large"
        ></a-select>

        <a-select
          v-model:value="selectedGugun"
          style="width: 120px"
          :options="gugunList"
          :field-names="{ label: 'name', value: 'key' }"
          size="large"
        ></a-select>
      </a-space>
    </div>
    <div class="attraction-list-wrap">
      <attraction-list
        :attraction-list="attractionList"
        class="attraction-list"
      ></attraction-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { sidoGugunMap, sidoCodeList } from "@/util/code";
import { Attraction } from "../types";
import { requestAttractionList } from "../api";
import AttractionList from "../components/AttractionList.vue";
import { throttle } from "lodash";

const sidoList = [{ key: 0, name: "대한민국" }, ...sidoCodeList];
const gugunList = computed(() => {
  const gugunMap = sidoGugunMap.get(selectedSido.value);
  if (gugunMap) {
    const newGugunList = Array.from(gugunMap).map(([key, name]) => ({
      key,
      name,
    }));
    return [{ key: 0, name: "전체" }, ...newGugunList];
  } else return [{ key: 0, name: "전체" }];
});

const selectedSido = ref(0);
const selectedGugun = ref(0);

const attractionList = ref<Attraction[]>([]);

const page = ref(1);
const totalAttractionCount = ref(0);
const currentAttractionCount = ref(0);

watch(selectedSido, async () => {
  selectedGugun.value = 0;
  await resetPagination();
});

watch(selectedGugun, async () => {
  await resetPagination();
});

onMounted(() => {
  window.addEventListener("scroll", throttle(handleScroll, 300), {
    passive: true,
  });
  getAttractionList();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const resetPagination = async () => {
  page.value = 1;
  totalAttractionCount.value = 0;
  currentAttractionCount.value = 0;
  attractionList.value = [];
  await getAttractionList();
};

const getAttractionList = async () => {
  try {
    const res = await requestAttractionList({
      pgno: page.value,
      sidoCode: selectedSido.value,
      gugunCode: selectedGugun.value,
      pageSize: 20,
    });
    totalAttractionCount.value = res.totalCount;
    attractionList.value = [...attractionList.value, ...res.list];
    currentAttractionCount.value = attractionList.value.length;
  } catch (e) {
    console.error(e);
  } finally {
    page.value++;
  }
};

function handleScroll() {
  const { scrollTop, offsetHeight, scrollHeight } = document.documentElement;
  if (scrollTop + offsetHeight >= scrollHeight - 300) {
    // 페이지 끝에 거의 다다랐는지 확인
    getAttractionList();
  }
}
</script>

<style scoped lang="scss">
.heading {
  h1 {
    text-align: center;
    font-size: 3rem;
    margin: 2rem;
  }
}
.option-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
