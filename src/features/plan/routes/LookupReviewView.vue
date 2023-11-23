<template>
  <div class="root" v-if="masterPlanInfo !== null">
    <div class="header">
      <div class="dummy" />
      <div class="title">
        <h1>{{ masterPlanInfo.title }}</h1>
        <p>
          {{ dayjs(masterPlanInfo.startDate).format("YYYY.MM.DD") }} -
          {{ dayjs(masterPlanInfo.endDate).format("YYYY.MM.DD") }}
        </p>
      </div>
      <div class="actions-wrap">
        <a-button shape="circle" :icon="h(ShareAltOutlined)" />
        <a-button shape="circle" :icon="h(HeartOutlined)" />
      </div>
    </div>
    <a-row>
      <a-col :span="15">
        <Flipbook
          class="flipbook"
          :pages="pages"
          :n-polygons="6"
          :clickToZoom="false"
          @flip-left-end="onChangePage"
          @flip-right-end="onChangePage"
        >
        </Flipbook
      ></a-col>
      <a-col :span="8">
        <div>
          <p class="day-index">Day {{ currentCourse?.dayNo }}</p>
          <h2>
            {{ currentCourse?.attractionTitle }}
          </h2>
          <p class="content" v-html="currentCourse?.reviewContent"></p>
        </div>
      </a-col>
    </a-row>
  </div>
  <div v-else>
    <a-skeleton></a-skeleton>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import Flipbook from "flipbook-vue";
import { onMounted, ref, h, computed } from "vue";
import { PlanReviewDetailInfo, requestGetReviewDetail } from "..";
import { ShareAltOutlined, HeartOutlined } from "@ant-design/icons-vue";
const pages = ref<string[]>([]);

const props = defineProps<{ planMasterId: string }>();
const planMasterId = +props.planMasterId;
const masterPlanInfo = ref<PlanReviewDetailInfo | null>(null);
const currentPage = ref(0);

const currentCourse = computed(() => {
  return masterPlanInfo.value?.reviewList[currentPage.value];
});

onMounted(async () => {
  masterPlanInfo.value = await requestGetReviewDetail(planMasterId);
  pages.value = masterPlanInfo.value.reviewList.map((review) => review.imgUrl);
});

const onChangePage = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  .title {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    text-wrap: nowrap;

    h1 {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  .dummy {
    width: 100%;
  }

  .actions-wrap {
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: end;
  }
}
section {
  display: flex;
}
.flipbook {
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  overflow: hidden;
}

.day-index {
  color: $geekblue-8;
  font-size: 2rem;
  font-style: oblique;
  margin: 2rem 0;
  font-family: "Prata", serif;
}

h2 {
  font-size: 2rem;
}

.content {
  margin-top: 1rem;
  font-size: 1.5rem;
  line-height: 1.5;
  letter-spacing: 1px;
}
</style>
