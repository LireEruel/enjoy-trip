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
        <div class="img-wrap">
          <a-image :src="currentAttraction.firstImage"></a-image>
        </div>

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
footer {
  a {
    text-decoration: none;
    color: #06c;
    font-size: 1.3rem;
  }
  a::before {
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
