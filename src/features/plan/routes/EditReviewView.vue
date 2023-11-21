<template>
  <div class="root" v-if="masterPlanInfo !== null">
    <div class="header">
      <div class="dummy" />
      <div class="title">
        <h1>{{ masterPlanInfo.title }}</h1>
        <p>
          {{ dayjs(masterPlanInfo.startDate).format("YYYY.MM.DD") }} -
          {{ dayjs(masterPlanInfo.endDate).format("YYYY.MM.DD") }}
        </p>
      </div>
      <div class="actions-wrap">
        <a-button shape="circle" :icon="h(ShareAltOutlined)" />
        <a-button shape="circle" :icon="h(HeartOutlined)" />
        <a-button @click="editReview" type="primary">저장</a-button>
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey" class="tabs">
      <a-tab-pane
        v-for="dailyPlan in masterPlanInfo.dailyPlanDtoList"
        :key="dailyPlan.dayNo"
        :tab="`Day ${dailyPlan.dayNo}`"
      >
        <div v-if="dailyPlan.dailyPlanDetailDtoList.length != 0">
          <div
            v-for="(course, index) in dailyPlan.dailyPlanDetailDtoList"
            class="daily-plan"
          >
            <p class="course-index">Course {{ index + 1 }}</p>
            <a-row class="daily-plan" justify="space-between">
              <a-col class="course-info" :span="10">
                <h2>{{ course.attractionDto.title }}</h2>
                <a-image
                  :alt="course.attractionDto.title + ' 이미지'"
                  :src="course.attractionDto.firstImage"
                  fallback="data:image/png;base64,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"
                  :preview="false"
                  height="20rem"
                >
                  <template #placeholder>
                    <a-spin class="card-loading" />
                  </template>
                </a-image>
                <p>{{ course.attractionDto.description }}</p>
              </a-col>
              <a-col :span="11">
                <h3>인증 사진 업로드</h3>
                <a-upload list-type="picture-card" :action="serverUrl">
                  <plus-outlined />
                  <div style="margin-top: 8px">Upload</div>
                </a-upload>
                <h4>여행지 후기 작성</h4>
                <div class="editor-wrap">
                  <QuillEditor
                    theme="snow"
                    v-model:content="course.reviewContent"
                    contentType="html"
                    ref="editorElem"
                  >
                  </QuillEditor>
                </div>
              </a-col>
            </a-row>
            <a-divider></a-divider>
          </div>
        </div>
        <div v-else>
          <a-empty />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  <div v-else>
    <a-skeleton></a-skeleton>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {
  Course,
  DailyPlan,
  EditReviewParam,
  MasterPlan,
  requestEditReview,
  requestGetMasterPlan,
} from "..";
import { onMounted, ref, h } from "vue";
import {
  ShareAltOutlined,
  HeartOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import Swal from "sweetalert2";

const { planMasterId } = defineProps<{ planMasterId: number }>();
const masterPlanInfo = ref<MasterPlan | null>(null);
const activeKey = ref(1);
masterPlanInfo.value = await requestGetMasterPlan(planMasterId, false);

const serverUrl = import.meta.env.VITE_SERVER_URL + "/file/upload/review";

const editReview = async () => {
  const editReviewParam: EditReviewParam[] = [];
  masterPlanInfo.value?.dailyPlanDtoList.forEach((dailyPlan: DailyPlan) => {
    dailyPlan.dailyPlanDetailDtoList.forEach((course: Course) => {
      if (course.dailyPlanDetailId)
        editReviewParam.push({
          dailyPlanId: dailyPlan.dailyPlanId,
          reviewContent: course.reviewContent,
          fileIdList: [],
          dailyPlanDetailId: course.dailyPlanDetailId,
        });
    });
  });

  try {
    await requestEditReview(planMasterId, editReviewParam);
    Swal.fire("success", "여행 후기 저장 성공", "success");
  } catch {
    Swal.fire("error", "여행 후기 에러", "error");
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto 0;
  .title {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    text-wrap: nowrap;

    h1 {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  .dummy {
    width: 100%;
  }

  .actions-wrap {
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: end;
  }
}

.tabs {
  max-width: 1200px;
  margin: 2rem auto;
}
.course-index {
  font-size: 1.5rem;
  font-style: oblique;
  margin: 2rem 0;
}
.course-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.editor-wrap {
  height: 35vh;
}
</style>
