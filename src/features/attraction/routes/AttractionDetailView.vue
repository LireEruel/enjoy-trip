<template>
  <div class="attraction-detail-view">
    <a class="back" href="/attraction/list">목록으로</a>
    <div class="site-content">
      <div class="skeleton-wrap" v-if="onLoadingAttractionDetail">
        <a-skeleton></a-skeleton>
      </div>
      <div v-else-if="!onLoadingAttractionDetail && currentAttraction != null">
        <header>
          <h1>{{ currentAttraction?.title }}</h1>
        </header>
        <div class="img-wrap">
          <a-image
            :src="currentAttraction.firstImage"
            fallback="data:image/png;base64,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"
          ></a-image>
        </div>
        <div>
          <h2>상세정보</h2>
          <a-divider></a-divider>

          <p>{{ currentAttraction.description }}</p>

          <div id="map" v-if="!props.isModal"></div>
        </div>
        <section v-if="!props.isModal" class="review-section">
          <h3>
            여행지 후기 <span>{{ reviewTotalCount }}</span>
          </h3>
          <a-divider></a-divider>
          <div class="input-wrap">
            <div class="inputs">
              <a-input
                class="input-title"
                v-model:value="inputTitle"
                placeholder="여행지 후기의 제목을 작성해주세요"
              ></a-input>
              <a-textarea
                v-model:value="inputReview"
                placeholder="여행지 후기를 작성해주세요"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </div>

            <a-button
              class="submit-btn"
              type="primary"
              size="large"
              @click="postReview"
              >등록</a-button
            >
          </div>
          <a-list :data-source="reviewList">
            <template #loadMore>
              <div
                v-show="reviewPageSize * reviewPageNum <= reviewTotalCount"
                :style="{
                  textAlign: 'center',
                  marginTop: '12px',
                  height: '32px',
                  lineHeight: '32px',
                }"
              >
                <a-button @click="getReviews">loading more</a-button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item>
                <attraction-comment :review="item"></attraction-comment>
              </a-list-item>
            </template>
          </a-list>
        </section>
      </div>
      <a-empty v-else></a-empty>
    </div>
  </div>
</template>
<script setup lang="ts">
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  requestGetAttractionDetail,
  requestAttractionReviewList,
  requestAttractionComment,
} from "../api";
import { AttractionDetail, AttractionReview } from "../types";
import { mountMap, addMarker } from "@/lib/mapUtli.js";
import { AttractionComment } from "../components";

const props = defineProps<{
  contentId: number;
  isModal: undefined | boolean;
}>();
const onLoadingAttractionDetail = ref(false);
const currentAttraction = ref<null | AttractionDetail>(null);
const router = useRouter();
const reviewPageSize = 5;
const reviewPageNum = ref(1);
const reviewTotalCount = ref(0);

const inputTitle = ref("");
const inputReview = ref("");
const reviewList = ref<AttractionReview[]>([]);

onMounted(async () => {
  getAttraction();
  getReviews();
});

const getAttraction = async () => {
  onLoadingAttractionDetail.value = true;
  try {
    const res = await requestGetAttractionDetail(props.contentId);
    currentAttraction.value = res;
    try {
      mountMap(
        currentAttraction.value.latitude,
        currentAttraction.value.longitude,
        currentAttraction.value.mlevel
      );
      addMarker(
        currentAttraction.value.latitude,
        currentAttraction.value.longitude
      );
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    Swal.fire("error", "관광지 조회에 실패하였습니다.", "error").then(() => {
      router.push("/Attraction");
    });
  } finally {
    onLoadingAttractionDetail.value = false;
  }
};

const getReviews = async () => {
  try {
    const res = await requestAttractionReviewList(
      reviewPageSize,
      reviewPageNum.value,
      props.contentId
    );
    reviewList.value = res.list;
    reviewPageNum.value++;
    reviewTotalCount.value = res.totalCount;
  } catch (e) {
    console.error(e);
  }
};

const postReview = async () => {
  if (currentAttraction.value) {
    try {
      const res = await requestAttractionComment(
        currentAttraction.value?.contentId,
        inputTitle.value,
        inputReview.value,
        4
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/_colors.scss";
.attraction-detail-view {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 5%;
  flex-direction: column;
}
.back {
  text-decoration: none;
  color: #06c;
  font-size: 1.3rem;
  &::before {
    float: left;
    width: 1rem;
    font-size: 1.3rem;
    height: 0.34rem;
    color: #06c;
    box-sizing: border-box;
    content: "<";
    margin-right: 0.1rem;
    background-size: 0.33rem 0.14rem;
    background-position: center;
    letter-spacing: -0.1rem;
  }
}

.skeleton-wrap {
  padding: 5rem 0;
}
.site-content {
  width: 1200px;
  header {
    padding-top: 5rem;
    h1 {
      font-size: 3rem;
      line-height: 1.5;
      text-align: center;
    }
  }
}
.img-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5rem 0;
}
h2 {
  font-size: 2rem;
  line-height: 1.5;
}
p {
  font-size: 1.2rem;
  line-height: 1.3;
  margin-bottom: 3rem;
}
.review-section {
  h3 {
    font-size: 2rem;
    line-height: 1.5;
    margin-top: 2rem;
  }
  .input-wrap {
    padding: 1rem;
    background-color: $gray-2;
    display: flex;
    gap: 0.7rem;
    align-items: flex-end;
    .inputs {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 1rem;
    }
  }
}

#map {
  width: 100%;
  height: 400px;
}
@media screen and (max-width: 1599px) {
  .site-content {
    width: 980px;
  }
}

@media screen and (max-width: 979px) {
  .site-content {
    width: 500px;
  }
}

@media screen and (max-width: 600px) {
  .attraction-detail-view {
    width: 500px;
  }
  .site-content {
    width: 300px;
  }
}
</style>
