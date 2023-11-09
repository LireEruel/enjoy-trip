<template>
  <div class="user-info-page">
    <header>
      <nav>
        <h1>계정</h1>
        <a>로그아웃</a>
      </nav>
      <p>서희 님, 안녕하세요.</p>
      <div>
        <a> 개인정보 수정</a>
        <a> 애인 조회</a>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@mixin more-button {
  background: transparent;
  border: 0;
  color: #06c;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  padding: 0;
  vertical-align: inherit;
  cursor: pointer;
  &::after {
    content: ">";
    padding-left: 0.3em;
    top: 0;
  }
}
header {
  background-color: #e6f4ff;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    h1 {
      font-size: 1.2rem;
      font-weight: 700;
    }
    a {
      @include more-button;
      font-size: 0.8em;
    }
  }
}
</style>
