<template>
  <div class="user-info-page">
    <header>
      <nav>
        <h1>계정</h1>
        <a @click="logout">로그아웃</a>
      </nav>
      <div class="header-content">
        <p class="greeting">
          {{ userInfo?.userName }} 님, 안녕하세요.
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Blue%20Heart.png"
            alt="Blue Heart"
            width="70"
            height="70"
          />
        </p>
        <div class="header-feature-wrap">
          <a> 개인정보 수정</a>
          <span v-if="!userInfo?.partnerCusNo">
            <a> 애인 조회</a>
          </span>
          <span v-else>
            <a @click="handleCopy" :value="inviteKey">애인 초대키 복사</a>
          </span>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { requestGetInviteKey } from "../api";
import { useUserStore } from "@/stores/user";
import { MyInfo } from "@/types/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const userInfo = ref<MyInfo | undefined>(undefined);
const params = defineProps({ cusNo: { type: Number, required: true } });
const isMyInfo = ref<boolean>(false);
const inviteKey = ref("");
const router = useRouter();

const logout = () => {
  userStore.logout();
};

onMounted(() => {
  isMyInfo.value = userStore.userInfo?.cusNo === +params.cusNo;
  if (isMyInfo.value) {
    userInfo.value = userStore.userInfo;
  }
  getInviteKey();
});

const getInviteKey = async () => {
  try {
    const res = await requestGetInviteKey(params.cusNo);
    inviteKey.value = res;
  } catch (error) {
    Swal.fire("error", "초대키 조회에 실패하였습니다.", "error");
  }
};

const handleCopy = () => {
  navigator.clipboard
    .writeText(inviteKey.value)
    .then(() => Swal.fire("success", "초대키를 복사했습니다", "success"));
};
</script>

<style scoped lang="scss">
@mixin more-button($font-size: number) {
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
  font-size: $font-size;
  &::after {
    content: ">";
    padding-left: 0.3em;
    top: 0;
  }
}
header {
  background-color: #e6f7ff;
  padding: 0 200px;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #91d5ff;
    h1 {
      font-size: 1.2rem;
      font-weight: 600;
    }
    a {
      @include more-button(0.7em);
    }
  }
  .header-content {
    padding: 2rem 1rem 2rem;
    .greeting {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .header-feature-wrap {
      display: flex;
      gap: 1em;
      a {
        @include more-button(0.9em);
      }
    }
  }
}
</style>
