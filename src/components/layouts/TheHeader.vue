<template>
  <a-layout id="components-layout">
    <a-layout-header class="default-header">
      <div>
        <router-link to="/" class="app-logo">Home </router-link>
      </div>
      <div class="nav-right">
        <a-menu v-model:selectedKeys="menuKey" class="menu" mode="horizontal">
          <a-menu-item key="/">
            <router-link to="/notice"> 공지사항 </router-link>
          </a-menu-item>
          <a-menu-item key="/#">
            <router-link to="/#"> MenuItem2 </router-link>
          </a-menu-item>
        </a-menu>
        <div v-if="userStore.userInfo" class="right-buttons-wrap">
          <a-button shape="circle" :icon="h(MessageOutlined)" />
          <a-button shape="circle" :icon="h(BellOutlined)" />
          <a-button
            shape="circle"
            :icon="h(UserOutlined)"
            @click="goUserInfo"
          />
        </div>
        <div v-else>
          <a-button class="login-button" @click="goLogin" size="large">
            로그인
          </a-button>
        </div>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { h } from "vue";
import {
  MessageOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
import { useUserStore } from "@/stores/user";
const router = useRouter();

const goLogin = () => {
  router.push("login");
};
const userStore = useUserStore();

const menuKey = ref<string[]>([window.location.pathname]);

const goUserInfo = () => {
  router.push({
    name: "userInfo",
    params: { cusNo: userStore.userInfo?.cusNo },
  });
};
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
  z-index: 10;
  background-color: white;
}

.default-header {
  position: fixed;
  width: 100%;
  overflow: hidden;
  background-color: white;
  top: 0;
  display: flex;
  justify-content: space-between;
  .ant-menu {
    height: 98%;
  }
}
.login-button {
  font-weight: 900;
}

.nav-right {
  display: flex;
  gap: 2rem;

  .right-buttons-wrap {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
}
</style>
