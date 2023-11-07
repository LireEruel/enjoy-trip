<template>
  <div id="notice-lookup-view">
    <section class="top-section">
      <div class="title-wrap">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Milky%20Way.png"
          alt="Milky Way"
        />
        <div>
          <h2>공지사항</h2>
          <p>커플 플래닝의 업데이트 정보 등 다양한 소식을 알려드립니다.</p>
        </div>
      </div>
    </section>
    <section class="option-section">
      <router-link :to="{ name: 'noticeWrite' }">
        <a-button type="primary">공지사항 작성</a-button>
      </router-link>
      <a-input-search
        v-model:value="searchText"
        placeholder="input search text"
        style="width: 200px"
        @search="searchNoticeList"
      />
    </section>

    <section class="notice-list">
      <div class="table-container">
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :loading="onLoadingNoticeList"
          :pagination="false"
        >
        </a-table>
        <p
          class="view-more-wrap"
          @click="getNoticeList"
          v-show="currentNoticeCount < totalNoticeCount"
        >
          더 보기
          <span class="current"> {{ currentNoticeCount }}</span> /<span
            class="max"
            >{{ totalNoticeCount }}</span
          ><DownOutlined />
        </p>
        <div
          v-show="
            currentNoticeCount == totalNoticeCount && currentNoticeCount > 0
          "
          class="empty-space"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { requestGetNoticeList } from "../api/list";
import { DownOutlined } from "@ant-design/icons-vue";
const dataSource = ref<Array<Notice>>([]);
const onLoadingNoticeList = ref<Boolean>(false);
const searchText = ref<String>("");
const pageNum = ref(1);
const totalNoticeCount = ref(0);
const currentNoticeCount = ref(0);

const getNoticeList = async () => {
  onLoadingNoticeList.value = true;
  try {
    const res = await requestGetNoticeList(pageNum.value, searchText.value);
    totalNoticeCount.value = res.totalCount;
    dataSource.value = [...dataSource.value, ...res.list];
    currentNoticeCount.value = dataSource.value.length;
  } catch (error) {
    console.error(error);
  } finally {
    onLoadingNoticeList.value = false;
    pageNum.value++;
  }
};

const searchNoticeList = () => {
  pageNum.value = 1;
  totalNoticeCount.value = 0;
  currentNoticeCount.value = 0;
  dataSource.value = [];
  getNoticeList();
};

onMounted(async () => {
  await getNoticeList();
});
const columns = [
  {
    title: "번호",
    dataIndex: "noticeId",
    sorter: true,
    width: "10%",
  },
  {
    title: "작성일",
    dataIndex: "startTime",
    sorter: true,
    width: "20%",
  },
  {
    title: "제목",
    dataIndex: "title",
  },
];
</script>

<style lang="scss" scoped>
#notice-lookup-view {
  height: 100%;
  .top-section {
    background-color: #4096ff;
    color: white;
    display: flex;
    align-items: center;
    padding: 4em;
    .title-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      h2 {
        font-size: 2.5em;
        margin: 0 0 1rem 0;
      }
      img {
        width: 5em;
        height: 5em;
        margin-right: 2em;
      }
    }

    p {
      font-size: 1.2rem;
      font-weight: 500;
    }
    padding-left: 15%;
  }
  .option-section {
    display: flex;
    justify-content: end;
    padding-right: 15%;
    margin: 2em 0;
    gap: 1em;
  }
  .notice-list {
    display: flex;
    justify-content: center;
    align-items: center;
    .table-container {
      width: 70%;
    }
  }
  .view-more-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4em;
    cursor: pointer;
    gap: 0.5em;
    font-size: 1.2em;
    .current {
      color: #4096ff;
    }
    .max {
      color: #bfbfbf;
    }
  }
  .empty-space {
    padding: 4em;
  }
}
</style>
