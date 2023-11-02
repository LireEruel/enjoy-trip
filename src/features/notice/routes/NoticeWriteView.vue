<template>
  <div id="noticeWriteView">
    <header>
      <h2>공지사항 작성</h2>
      <p>사용자에게 전해야 할 소식을 작성해봅시다.</p>
    </header>
    <div class="contents">
      <a-button
        @click="onClickConfirmBtn"
        type="primary"
        class="submit-btn"
        size="large"
        >등록</a-button
      >
      <div class="options-wrap">
        <a-range-picker v-model:value="selectedTime" show-time />

        <a-switch
          id="viewYn"
          v-model:checked="viewYn"
          checked-children="공개"
          un-checked-children="비공개"
        />
      </div>

      <a-input v-model:value="title" placeholder="제목을 입력해주세요." />
      <div class="editor-wrap">
        <QuillEditor theme="snow" v-model:content="input" contentType="html" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Dayjs } from "dayjs";
type RangeValue = [Dayjs, Dayjs];
const input = ref("");
const viewYn = ref(false);
const title = ref("");
const selectedTime = ref<RangeValue>();

const onClickConfirmBtn = () => {
  console.log(input.value);
};
</script>

<style scoped lang="scss">
#noticeWriteView {
  height: 100%;
  width: 100%;

  header {
    padding: 2em;
    background-color: #4096ff;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    h2 {
      font-size: 2em;
    }
    p {
      font-size: 1em;
    }
  }
  .contents {
    padding: 3em 25em 7em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1em;

    .options-wrap {
      display: flex;
      align-items: center;
      gap: 2em;
    }
  }
  .editor-wrap {
    width: 100%;
    height: 30em;
  }
}
</style>
