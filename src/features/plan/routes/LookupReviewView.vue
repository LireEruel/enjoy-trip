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
    <Flipbook
      class="flipbook"
      :pages="pages"
      :n-polygons="6"
      :clickToZoom="false"
      @flip-left-end="onChangePage"
      @flip-right-end="onChangePage"
    >
    </Flipbook>
  </div>
  <div v-else>
    <a-skeleton></a-skeleton>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import Flipbook from "flipbook-vue";
import { onMounted, ref, h } from "vue";
import { PlanReviewDetailInfo, requestGetReviewDetail } from "..";
import { ShareAltOutlined, HeartOutlined } from "@ant-design/icons-vue";
const pages = ref<string[]>([]);

const props = defineProps<{ planMasterId: string }>();
const planMasterId = +props.planMasterId;
const masterPlanInfo = ref<PlanReviewDetailInfo | null>(null);
const currentPage = ref(0);

onMounted(async () => {
  masterPlanInfo.value = await requestGetReviewDetail(planMasterId);
  pages.value = masterPlanInfo.value.reviewList.map((review) => review.imgUrl);
  console.log(pages.value);
});

const onChangePage = (page: number) => {
  currentPage.value = Math.floor(page / 2);
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto 0;
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
.flipbook {
  width: 70vw;
  height: 90vh;
  margin: 0 auto;
  overflow: hidden;
}
</style>
