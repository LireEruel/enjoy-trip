<template>
  <a-layout id="components-layout">
    <a-layout-header class="default-header">
      <div style="float: left">
        <router-link to="/" class="app-logo">Home </router-link>
      </div>

      <div class="nav-right">
        <!-- 로그인 -->
        <a-button class="login-button" @click="goLogin"> 로그인 </a-button>
        <span class="app-bar-padding" />
      </div>
      <a-menu v-model:selectedKeys="menuKey" class="menu" mode="horizontal">
        <a-menu-item key="/">
          <router-link to="/notice"> 공지사항 </router-link>
        </a-menu-item>
        <a-menu-item key="/#">
          <router-link to="/#"> MenuItem2 </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();

const goLogin = () => {
  router.push("login");
};

const menuKey = ref<string[]>([window.location.pathname]);
</script>

<style lang="scss" scoped>
#components-layout {
  height: 70px;
  width: 100%;
  margin-bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.default-header {
  position: fixed;
  width: 100%;
  overflow: hidden;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .ant-menu {
    height: 98%;
  }
}

#components-layout .menu {
  float: right;
}

#components-layout .nav-right {
  float: right;
  padding-left: 20px;
}

.login-button {
  font-weight: 900;
}
</style>
