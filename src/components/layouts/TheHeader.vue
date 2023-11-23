<template>
  <a-layout id="components-layout">
    <a-layout-header class="default-header">
      <div>
        <router-link to="/" class="app-logo">
          <img :src="logo" />
        </router-link>
      </div>
      <div class="nav-right">
        <a-menu v-model:selectedKeys="menuKey" class="menu" mode="horizontal">
          <a-menu-item key="/notice">
            <router-link to="/notice"> 공지사항 </router-link>
          </a-menu-item>
          <a-menu-item key="/attraction/list">
            <router-link to="/attraction/list"> 관광지 목록 </router-link>
          </a-menu-item>
        </a-menu>
        <div v-if="userStore.userInfo" class="right-buttons-wrap">
          <a-button
            shape="circle"
            :icon="h(MessageOutlined)"
            @click="emit('on-click-chat-btn')"
          />
          <a-button shape="circle" :icon="h(BellOutlined)" />
          <a-button
            shape="circle"
            :icon="h(UserOutlined)"
            @click="goUserInfo"
          />
          <a-dropdown :trigger="['click']">
            <a-button type="primary">생성하기</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0" @click="openAddPlanModal">
                  <p>여행 계획 작성</p>
                </a-menu-item>
                <a-menu-item key="1" @click="openAddReviewModal">
                  <p>여행 후기 작성</p>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
import { useCommonStore } from "@/stores/common";
import logo from "@/assets/logo.png";
const router = useRouter();

const goLogin = () => {
  router.push("/login");
};
const userStore = useUserStore();
const emit = defineEmits(["on-click-chat-btn"]);

const commonStore = useCommonStore();
const menuKey = ref<string[]>([window.location.pathname]);

const goUserInfo = () => {
  router.push({
    name: "userInfo",
    params: { cusNo: userStore.userInfo?.cusNo },
  });
};

const openAddPlanModal = () => {
  commonStore.isOpenAddPlanModal = true;
};
const openAddReviewModal = () => {
  commonStore.isOpenAddReviewModal = true;
};
</script>

<style lang="scss" scoped>
.app-logo {
  img {
    height: 100%;
  }
}
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
