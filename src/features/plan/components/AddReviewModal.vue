<template>
  <a-modal
    v-model:open="commonStore.isOpenAddReviewModal"
    :centered="true"
    @cancel="onCloseModal"
    title="후기를 작성할 일정을 선택해주세요."
  >
    <a-list :data-source="planList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a-tag color="green">
                {{ sidoCodeNameMap.get(item.sidoCode) }}
              </a-tag>
              <a-tag color="cyan" v-if="item.gugunCode">
                {{ sidoGugunMap.get(item.sidoCode)?.get(item.gugunCode) }}
              </a-tag>
              <div>{{ item.title }}</div>
            </template>
            <template #description>
              <div>
                {{ dayjs(item.startDate).format("YYYY.MM.DD") }} ~
                {{ dayjs(item.startDate).format("YYYY.MM.DD") }}
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-modal>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";

import { onMounted, ref } from "vue";
import { MasterPlan, requestGetPersonalPlan } from "..";
import { useUserStore } from "@/stores/user";
import dayjs from "dayjs";
import { sidoCodeNameMap, sidoGugunMap } from "@/util/code";

const commonStore = useCommonStore();
const userStore = useUserStore();
const userInfo = userStore.userInfo;
const onCloseModal = () => {
  commonStore.isOpenAddReviewModal = false;
};
const planList = ref<MasterPlan[]>([]);
onMounted(() => {
  getPlanList();
});

const getPlanList = async () => {
  if (userInfo?.cusNo) {
    const res = await requestGetPersonalPlan(userInfo?.cusNo);
    planList.value = res.list;
    console.log(planList.value);
  }
};
</script>

<style scoped lang="scss"></style>
