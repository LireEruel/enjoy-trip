<template>
  <div id="noticeWriteView">
    <header>
      <h2>공지사항 작성</h2>
      <p>사용자에게 전해야 할 소식을 작성해봅시다.</p>
    </header>
    <div class="editor-wrap">
      <QuillEditor theme="snow" />
    </div>
    <div>
      <a-button>취소</a-button>
      <a-button>확인</a-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#noticeWriteView {
  height: 80%;
  width: 100%;

  header {
    padding: 2em;
    background-color: #4096ff;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-bottom: 5em;

    h2 {
      font-size: 2em;
    }
    p {
      font-size: 1em;
    }
  }
  .editor-wrap {
    height: 70%;
    width: 80%;
    margin: auto;
    padding-bottom: 5%;
  }
}
</style>
