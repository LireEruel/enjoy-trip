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
            <div class="button-wrap">
              <a-button @click="goEditNotice">수정</a-button>
              <a-button
                :loading="onLoadingDeleteNotice"
                @click="deleteNotice"
                danger
                >삭제</a-button
              >
            </div>
          </div>
        </header>

        <section v-html="currentNotice.content" class="main-content"></section>
      </div>
      <a-empty v-else></a-empty>
      <footer>
        <a href="/notice">목록으로</a>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { requestDeleteNotice, requestGetNoticeDetail } from "../api";

const props = defineProps<{ noticeId: number }>();
const onLoadingNoticeDetail = ref(false);
const currentNotice = ref<null | Notice>(null);
const onLoadingDeleteNotice = ref(false);
const router = useRouter();
const getNotice = async () => {
  onLoadingNoticeDetail.value = true;
  try {
    const res = await requestGetNoticeDetail(props.noticeId);
    currentNotice.value = res;
  } catch (error) {
    Swal.fire("error", "공지사항 조회에 실패하였습니다.", "error").then(() => {
      router.push("/notice");
    });
  } finally {
    onLoadingNoticeDetail.value = false;
  }
};

onMounted(async () => {
  await getNotice();
});

const deleteNotice = async () => {
  onLoadingDeleteNotice.value = true;
  try {
    const res = await requestDeleteNotice(props.noticeId);
    currentNotice.value = res;
    Swal.fire("Success", "삭제에 성공하였습니다.", "success").then(() => {
      router.push("/notice");
    });
  } catch (error) {
    Swal.fire("error", "공지사항 삭제에 실패하였습니다. ", "error");
    console.error(error);
  } finally {
    onLoadingDeleteNotice.value = false;
  }
};

const goEditNotice = () => {
  router.push("/notice/write/" + props.noticeId);
};
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
  .notice-detail-view {
    width: 500px;
  }
  .site-content {
    width: 300px;
  }
}
</style>
