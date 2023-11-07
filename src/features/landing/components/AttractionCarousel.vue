<template>
  <div class="attraction-carousel">
    <h1>대한민국의 아름다움을 찾아보세요</h1>
    <a-space>
      <a-select
        v-model:value="selectedSido"
        style="width: 120px"
        :options="sidoCodeList"
        :field-names="{ label: 'name', value: 'key' }"
      ></a-select>

      <a-select
        v-model:value="selectedGugun"
        style="width: 120px"
        :options="gugunList"
        :field-names="{ label: 'name', value: 'key' }"
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
        <img :src="attraction.firstImage" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { computed, ref } from "vue";
//import { requestAttractionList } from "../api";
import { Attraction } from "..";
import { sidoGugunMap, sidoCodeList } from "../../../util/code";

const modules = [EffectCoverflow, Pagination, Autoplay];
const attractionList = ref<Attraction[]>([
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
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=29abbebf-86df-49e8-971e-78bac9b33efa",
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
]);

const selectedSido = ref(sidoCodeList[0].key);
const gugunList = computed(() => {
  return sidoGugunMap.find(
    (gugunInfo) => gugunInfo.sidoKey == selectedSido.value
  )?.gugunList;
});
const selectedGugun = ref({ key: 1, name: "강남구" });
// const getAttractionList = async () => {
//   try {
//     const res = await requestAttractionList({
//       pgno: page.value,
//     });
//     attractionList.value = res.list;
//   } catch (e) {}
// };
</script>

<style lang="scss" scoped>
.attraction-carousel {
  height: 30%;
  margin-top: 10rem;

  h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin: 5rem;
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
</style>
