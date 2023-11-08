<template>
  <div class="attraction-carousel">
    <h1>대한민국의 아름다움을 찾아보세요</h1>
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
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :loop="true"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="true"
      :modules="modules"
      :initialSlide="2"
    >
      <swiper-slide
        v-for="attraction in attractionList"
        :key="attraction.contentId"
      >
        <a-image
          :src="attraction.firstImage"
          fallback="data:image/png;base64,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"
          :height="300"
          :width="300"
          :preview="false"
        >
          <template #placeholder>
            <a-spin class="card-loading" />
          </template>
        </a-image>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { computed, ref, watch } from "vue";
import { requestAttractionList } from "../api";
import { Attraction } from "..";
import { sidoGugunMap, sidoCodeList } from "../../../util/code";

const modules = [EffectCoverflow, Pagination, Autoplay];
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
const attractionList = ref<Attraction[]>(bestAttractions);
const page = ref(1);
const sidoList = [{ key: 0, name: "대한민국" }, ...sidoCodeList];
const selectedSido = ref(0);
const gugunList = computed(() => {
  const newGugunList = sidoGugunMap.find(
    (gugunInfo) => gugunInfo.sidoKey == selectedSido.value
  )?.gugunList;
  if (newGugunList) return [{ key: 0, name: "전체" }, ...newGugunList];
  else return [{ key: 0, name: "전체" }];
});
const selectedGugun = ref(0);

watch(selectedSido, async () => {
  selectedGugun.value = 0;
  await getAttractionList();
});

watch(selectedGugun, async () => {
  await getAttractionList();
});

const getAttractionList = async () => {
  try {
    if (selectedSido.value == 0) {
      attractionList.value = bestAttractions;
    } else {
      const res = await requestAttractionList({
        pgno: page.value,
        sidoCode: selectedSido.value,
        gugunCode: selectedGugun.value,
      });
      attractionList.value = res.list;
    }
  } catch (e) {}
};
</script>

<style lang="scss" scoped>
.option-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2%;
}
.attraction-carousel {
  height: 30%;
  padding: 10rem 0;

  h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
  }
}
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
