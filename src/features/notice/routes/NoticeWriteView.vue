<template>
  <div id="noticeWriteView">
    <header>
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Telephone%20Receiver.png"
        alt="Telephone Receiver"
      />
      <div>
        <h2>공지사항 작성</h2>
        <p>사용자에게 전해야 할 소식을 작성해봅시다.</p>
      </div>
    </header>
    <div class="contents">
      <a-button
        @click="onClickConfirmBtn"
        :loading="onLoading"
        type="primary"
        class="submit-btn"
        size="large"
        >등록</a-button
      >
      <div class="options-wrap">
        <a-range-picker v-model:value="selectedRange" show-time />

        <a-switch
          id="viewYn"
          v-model:checked="viewYn"
          checked-children="공개"
          un-checked-children="비공개"
        />
      </div>

      <a-input v-model:value="title" placeholder="제목을 입력해주세요." />
      <div class="editor-wrap">
        <QuillEditor
          theme="snow"
          v-model:content="contents"
          contentType="html"
          ref="editorElem"
        >
        </QuillEditor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Dayjs } from "dayjs";
import Swal from "sweetalert2";
import { requestAddNoticeList } from "../api";
type RangeValue = [Dayjs, Dayjs];
const contents = ref("");
const viewYn = ref(false);
const title = ref("");
const selectedRange = ref<RangeValue>();
const format = "YYYY-MM-DD hh:mm";
type editorType = { getText: () => String } | null;
const editorElem = ref<editorType>(null);
const onLoading = ref(false);

const checkValidState = () => {
  const result = {
    startTime: "",
    endTime: "",
    content: "",
    viewYn: "",
    title: "",
    files: [],
  };

  if (selectedRange.value?.[0]) {
    result.startTime = selectedRange.value[0].format(format);
    result.endTime = selectedRange.value[1].format(format);
  } else {
    Swal.fire("error", "기간을 선택해주세요.", "warning");
    return;
  }

  if (title.value) {
    if (title.value.length < 10) {
      Swal.fire("error", "제목이 너무 짧습니다.", "warning");
      return;
    } else {
      result.title = title.value;
    }
  } else {
    Swal.fire("error", "제목을 입력해주세요.", "warning");
    return;
  }
  if (editorElem.value) {
    const pureText = editorElem.value.getText().trim();
    if (pureText.length < 15) {
      Swal.fire("error", "글이 너무 짧습니다.", "warning");
      return;
    } else {
      result.content = contents.value;
    }
  }
  result.viewYn = viewYn ? "Y" : "F";
  return result;
};

const onClickConfirmBtn = () => {
  const params = checkValidState();
  console.log(params);
  if (params) {
    onLoading.value = true;
    try {
      const res = requestAddNoticeList(params);
      console.log(res);
    } finally {
      onLoading.value = false;
    }
  }
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
    justify-content: center;
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
