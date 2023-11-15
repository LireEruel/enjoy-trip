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
const bestAttractions = [
  {
    contentId: 317503,
    contentTypeId: 12,
    title: "분황사",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7d02d9fc-a52c-4b5d-8597-3949c183c46b",
    addr1: "경상북도 경주시 분황로 94-11",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 572968,
    contentTypeId: 12,
    title: "따라비 오름",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=793ac091-5507-46fb-88d2-af06966935ab",
    addr1: "제주특별자치도 서귀포시 표선면 가시리 산62",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 2606216,
    contentTypeId: 12,
    title: "사천바다 케이블카",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a48f007b-043f-4cbc-a706-330ae504b6f1",
    addr1: "경상남도 사천시 사천대로 18",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 2613675,
    contentTypeId: 14,
    title: "미술관 자작나무숲",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=b0e65522-46b5-4539-b7ba-d60a5fcb85bf",
    addr1: "강원도 횡성군 우천면 한우로두곡5길 186",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 2616157,
    contentTypeId: 12,
    title: "남서일몰전망대",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=dea9e449-3e78-4845-a6a5-6fe0993fe136",
    addr1: "경상북도 울릉군 서면 남서리",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 2633924,
    contentTypeId: 12,
    title: "시흥배곧한울공원 해수체험장",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=31e178a8-756b-4685-8e2e-bd133c15f9f3",
    addr1: "경기도 시흥시 해송십리로 61 (정왕동)",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 2758192,
    contentTypeId: 12,
    title: "올림픽공원들꽃마루",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a4aadc1e-2cf6-43c8-91bc-e27a75472dcc",
    addr1: "서울특별시 송파구 올림픽로 424 (방이동)",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
  {
    contentId: 2841245,
    contentTypeId: 12,
    title: "임진강댑싸리공원",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=29abbebf-86df-49e8-971e-78bac9b33efa",
    addr1: "경기도 연천군 중면 삼곶리422",
    addr2: "",
    isMyLove: false,
    isPartenerLove: false,
  },
];
const sidoList = [{ key: 0, name: "대한민국" }, ...sidoCodeList];
const gugunList = computed(() => {
  const newGugunList = sidoGugunMap.find(
    (gugunInfo) => gugunInfo.sidoKey == selectedSido.value
  )?.gugunList;
  if (newGugunList) return [{ key: 0, name: "전체" }, ...newGugunList];
  else return [{ key: 0, name: "전체" }];
});

const selectedSido = ref(0);
const selectedGugun = ref(0);

const attractionList = ref<Attraction[]>(bestAttractions);

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
  window.addEventListener("scroll", handleScroll);
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
  if (scrollTop + offsetHeight >= scrollHeight - 10) {
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
