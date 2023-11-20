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
          <span v-if="isCouple">
            <a> 애인 조회</a>
          </span>
          <span v-else>
            <a @click="handleCopy" :value="inviteKey">애인 초대키 복사</a>
            <a @click="onClickSubmitInviteKeyBtn">애인 초대키 입력</a>
          </span>
        </div>
      </div>
    </header>
    <section class="relation-section">
      <div v-if="isCouple">
        <h2>내 애인</h2>
        <div class="partner-info-wrap">
          <a-avatar :size="64">
            <template #icon><user-outlined /></template>
          </a-avatar>
          <p>{{ userInfo?.partnerName }}</p>
        </div>
      </div>
      <div v-else>
        <div class="relation-info-wrap">
          <a-alert
            v-for="relation in relationList"
            :key="relation.relationId"
            type="success"
            show-icon
          >
            <template #icon><smile-outlined /></template>
            <template #message>
              <p>
                <span>{{ relation.userName }}</span
                >님께서 애인 신청을 보내셨습니다.
              </p>
            </template>
            <template #action>
              <a-space>
                <a-button
                  size="small"
                  danger
                  @click="() => relationApproval(relation.relationId, true)"
                  >수락</a-button
                >
                <a-button
                  @click="() => relationApproval(relation.relationId, false)"
                  size="small"
                  type="primary"
                  ghost
                  >거절</a-button
                >
              </a-space>
            </template>
          </a-alert>
        </div>
      </div>
    </section>
    <section class="my-plan-section">
      <h2>내 여행 계획</h2>
      <!-- TODO: 여행 계획 생성 버튼 추가 -->
      <div v-if="myPlanList.length > 0">
        <swiper
          :grabCursor="true"
          :slidesPerView="4"
          :space-between="50"
          :modules="modules"
          :pagination="{ clickable: true }"
          class="plan-list"
        >
          <swiper-slide v-for="plan in myPlanList" :key="plan.planMasterId">
            <div class="plan-card" @click="() => goPlanEdit(plan.planMasterId)">
              <div class="first-image transition-all"></div>
              <h3>{{ plan.title }}</h3>
              <p class="day-info">
                <span>{{ dayjs(plan.startDate).format("DD MMM YYYY") }}</span>
                •
                <span
                  >{{
                    dayjs(plan.endDate).diff(dayjs(plan.startDate), "day") + 1
                  }}
                  days</span
                >
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <a-empty v-else />
    </section>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import {
  requestGetInviteKey,
  requestGetRequestRelationList,
  requestSubmitInviteKey,
} from "../api";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useUserStore } from "@/stores/user";
import { MyInfo } from "@/types/user";
import { computed, onMounted, ref } from "vue";
import { requestGetPersonalPlan } from "@/features/plan/api";
import { MasterPlan } from "@/features/plan";
import { Swiper, SwiperSlide } from "swiper/vue";
import * as dayjs from "dayjs";
import { SmileOutlined, UserOutlined } from "@ant-design/icons-vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "vue-router";
import { Relation, requestRelationApproval } from "..";

const modules = [EffectCoverflow, Pagination];
const userStore = useUserStore();
const userInfo = ref<MyInfo | undefined>(undefined);
const params = defineProps({ cusNo: { type: String, required: true } });
const isMyInfo = ref<boolean>(false);
const inviteKey = ref("");
const myPlanList = ref<MasterPlan[]>([]);
const router = useRouter();
const cusNo = +params.cusNo;
const logout = () => {
  userStore.logout();
  router.push("/");
};
const isCouple = computed(() => (userInfo.value?.partnerCusNo ? true : false));

const relationList = ref<Relation[]>([]);

onMounted(async () => {
  // 내 정보인지 확인
  isMyInfo.value = userStore.userInfo?.cusNo === cusNo;
  if (isMyInfo.value) {
    // 내 정보라면 내 정보 그냥 받음
    userInfo.value = userStore.userInfo;
  } else {
    // TODO : 남의 정보 받아옴.
  }
  if (!isCouple.value) {
    getInviteKey();
    const res = await requestGetRequestRelationList();
    // TODO 관계 조회 API 수정시 주석 제거
    relationList.value = res;
  }
  getMyPlanList();
});

const onClickSubmitInviteKeyBtn = () => {
  Swal.fire({
    title: "공유받은 초대키를 입력해주세요.",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Submit",
    showLoaderOnConfirm: true,
    preConfirm: async (key: string) => {
      try {
        const res = await requestSubmitInviteKey(key);
        console.log(res);
      } catch {
        Swal.showValidationMessage(`
        초대키를 다시 확인해주세요.
      `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("요청 성공!", "애인 등록 요청이 성공하였습니다.", "success");
    }
  });
};

const getInviteKey = async () => {
  try {
    const res = await requestGetInviteKey();
    inviteKey.value = res;
  } catch (error) {
    Swal.fire("error", "초대키 조회에 실패하였습니다.", "error");
  }
};

const getMyPlanList = async () => {
  try {
    const res = await requestGetPersonalPlan(cusNo);
    myPlanList.value = res.list;
  } catch (error) {
    Swal.fire("error", "여행 일정 조회에 실패하였습니다.", "error");
  }
};

const handleCopy = () => {
  navigator.clipboard
    .writeText(inviteKey.value)
    .then(() => Swal.fire("success", "초대키를 복사했습니다", "success"));
};

const goPlanEdit = (id: number) => {
  router.push({
    name: "editPlan",
    params: { planMasterId: id },
  });
};

const relationApproval = async (relationId: number, isApproval: boolean) => {
  try {
    const res = await requestRelationApproval(isApproval, relationId);
    console.log(res);
  } catch (e) {
    Swal.fire("error");
  }
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
  padding: 0 20%;
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
      align-items: center;
      gap: 1em;
      a {
        @include more-button(0.9em);
      }
    }
  }
}
.relation-section {
  padding: 5rem 20%;
  .partner-info-wrap {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 3rem;
    p {
      font-size: 1.5rem;
    }
  }
  .relation-info-wrap {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: auto;
    gap: 2rem;
    span {
      color: $primary;
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
}

.my-plan-section {
  padding: 0 20% 8rem;
  h2 {
    padding: 1rem 0;
    margin-bottom: 2rem;
  }
}
.plan-list {
  height: 20rem;
  .plan-card {
    .first-image {
      height: 10rem;
      object-fit: cover;
      background-image: url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a48f007b-043f-4cbc-a706-330ae504b6f1);
      padding: 1rem;
      background-position: center;
      background-size: cover;
      border-radius: 0.5rem;
    }

    h3 {
      margin: 1rem 0 0.2rem;
    }
    .day-info {
      font-size: 0.9rem;
    }
  }
}
</style>
