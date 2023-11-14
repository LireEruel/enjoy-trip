<template>
  <div class="attraction-detail-view">
    <div class="site-content">
      <div class="skeleton-wrap" v-if="onLoadingAttractionDetail">
        <a-skeleton></a-skeleton>
      </div>
      <div v-else-if="!onLoadingAttractionDetail && currentAttraction != null">
        <header>
          <h1>{{ currentAttraction?.title }}</h1>
        </header>

        <a-image :src="currentAttraction.firstImage"></a-image>
        <h2>상세정보</h2>
        <a-divider></a-divider>
        <p>{{ currentAttraction.description }}</p>
      </div>
      <a-empty v-else></a-empty>
      <footer>
        <a href="/attraction/list">목록으로</a>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { requestGetAttractionDetail } from "../api";
import { Attraction } from "../types";

const props = defineProps<{ contentId: number }>();
const onLoadingAttractionDetail = ref(false);
const currentAttraction = ref<null | Attraction>(null);
const router = useRouter();
const getAttraction = async () => {
  onLoadingAttractionDetail.value = true;
  try {
    const res = await requestGetAttractionDetail(props.contentId);
    currentAttraction.value = res;
  } catch (error) {
    Swal.fire("error", "공지사항 조회에 실패하였습니다.", "error").then(() => {
      router.push("/Attraction");
    });
  } finally {
    onLoadingAttractionDetail.value = false;
  }
};

onMounted(async () => {
  await getAttraction();
});
</script>

<style scoped lang="scss">
.attraction-detail-view {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.skeleton-wrap {
  padding: 5rem 0;
}
.site-content {
  width: 1200px;
  header {
    padding-top: 5rem;
    h1 {
      font-size: 1.7rem;
      line-height: 1.5;
    }
  }
}

.meta {
  margin: 1rem 0;
  display: flex;
  color: gray;
  align-items: center;
  justify-content: space-between;
  .button-wrap {
    display: flex;
    gap: 0.7em;
  }
}

.main-content {
  padding: 2rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 2rem;
}

footer {
  a {
    text-decoration: none;
  }
  a::before {
    float: left;
    width: 2rem;
    height: 0.34rem;
    box-sizing: border-box;
    content: "<----";
    margin-right: 0.1rem;
    background-size: 0.33rem 0.14rem;
    background-position: center;
    letter-spacing: -0.1rem;
  }
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
