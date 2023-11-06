<template>
  <div class="notice-detail-view">
    <div class="site-content">
      <div class="skeleton-wrap" v-if="onLoadingNoticeDetail">
        <a-skeleton></a-skeleton>
      </div>
      <div v-else-if="!onLoadingNoticeDetail && currentNotice != null">
        <header>
          <h1>{{ currentNotice?.title }}</h1>
          <div class="meta">
            <span class="register-time">{{ currentNotice.registerTime }}</span>
          </div>
        </header>

        <section v-html="currentNotice.content" class="main-content"></section>
      </div>
      <a-empty v-else></a-empty>
      <footer>
        <a href="/notice/list">목록으로</a>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { requestGetNoticeDetail } from "../api";
import { onMounted, ref } from "vue";
const props = defineProps<{ noticeId: number }>();
const onLoadingNoticeDetail = ref(false);
const currentNotice = ref<null | Notice>(null);

const getNoticeList = async () => {
  onLoadingNoticeDetail.value = true;
  try {
    const res = await requestGetNoticeDetail(props.noticeId);
    currentNotice.value = res;
  } catch (error) {
    console.error(error);
  } finally {
    onLoadingNoticeDetail.value = false;
  }
};

onMounted(async () => {
  await getNoticeList();
});
</script>

<style scoped lang="scss">
.notice-detail-view {
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
  flex-direction: column;
  gap: 0.2em;
  color: gray;
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
  .notice-detail-view {
    width: 500px;
  }
  .site-content {
    width: 300px;
  }
}
</style>
