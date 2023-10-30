<template>
  <div id="notice-lookup-view">
    <section class="top-section">
      <div>
        <h2>공지사항</h2>
        <p>커플 플래닝의 업데이트 정보 등 다양한 소식을 알려드립니다.</p>
      </div>
    </section>
    <section class="option-section">
      <a-input-search
        v-model:value="searchText"
        placeholder="input search text"
        style="width: 200px"
        @search="getNoticeList"
      />
    </section>

    <section class="notice-list">
      <div class="table-container">
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :loading="onLoadingNoticeList"
        >
        </a-table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { requestGetNoticeList } from "../api/list";

const dataSource = ref<Array<Notice>>([]);
const onLoadingNoticeList = ref<Boolean>(false);
const searchText = ref<String>("");
const pageNum = ref(1);
const getNoticeList = async () => {
  onLoadingNoticeList.value = true;
  try {
    const res = await requestGetNoticeList(pageNum.value, searchText.value);
    console.log(res);
  } catch (error) {
  } finally {
    onLoadingNoticeList.value = false;
  }
};

onMounted(async () => {
  await getNoticeList();
});
const columns = [
  {
    title: "번호",
    dataIndex: "name",
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
    dataIndex: "name",
  },
];
</script>

<style lang="scss" scoped>
#notice-lookup-view {
  height: 100%;
  .top-section {
    background-color: #4096ff;
    color: white;
    height: 30%;
    display: flex;
    align-items: center;
    h2 {
      font-size: 2.5em;
      margin: 0 0 1rem 0;
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
  }
  .notice-list {
    display: flex;
    justify-content: center;
    align-items: center;
    .table-container {
      width: 70%;
    }
  }
}
</style>
