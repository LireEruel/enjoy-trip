<template>
  <div class="notice-detail-view">
    <div class="site-content">
      <div v-if="onLoadingNoticeDetail">
        <a-skeleton></a-skeleton>
      </div>
      <div v-else-if="!onLoadingNoticeDetail && currentNotice != null">
        <header>
          <h1>{{ currentNotice?.title }}</h1>
          <div class="meta">
            <span class="register-time">{{ currentNotice.registerTime }}</span>
            <p>
              기간 : {{ currentNotice.startTime }} ~ {{ currentNotice.endTime }}
            </p>
          </div>
        </header>

        <section v-html="currentNotice.content"></section>
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
const currentNotice = ref<null | Notice>({
  noticeId: 23,
  writerNo: 123,
  title: "[필독] 11/8 메일 서비스 스토리지 업그레이드 작업 사전 안내",
  content:
    "<p>안녕하세요, 네이버웍스입니다.</p>네이버웍스 메일 <strong>서비스의 스토리지 업그레이드 작업이 1</strong>1/8 오후 11시에 예정되어 있습니다.고객께서는 업그레이드 작업 중에 메일 서비스 접속 시 순단 현상을 경험할 수 있으니 자세한 내용은 아래 확인 부탁드립니다.",
  startTime: "2023-11-11",
  endTime: "2023-11-11",
  registerTime: "2023-11-11",
  viewYn: "Y",
});

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
