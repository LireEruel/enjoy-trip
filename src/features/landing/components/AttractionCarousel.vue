<template>
  <div class="attraction-carousel">
    <h1>대한민국의 아름다움을 찾아보세요</h1>
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="false"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
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
import { EffectCoverflow, Pagination } from "swiper/modules";
import { onMounted, ref } from "vue";
import { requestAttractionList } from "../api";
import { Attraction } from "..";

const modules = [EffectCoverflow, Pagination];
const page = ref(1);
const attractionList = ref<Attraction[]>([]);
const getAttractionList = async () => {
  try {
    const res = await requestAttractionList({
      pgno: page.value,
    });
    attractionList.value = res.list;
  } catch (e) {}
};
onMounted(async () => {
  getAttractionList();
});
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
