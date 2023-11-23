<template>
  <div>
    <a-row justify="center">
      <a-col span="20">
        <div class="root">
          <a-spin :spinning="isLoadingMap">
            <div id="map"></div>
          </a-spin>
          <div class="right-side">
            <a-page-header
              :title="masterPlan?.title"
              :sub-title="`${dayjs(masterPlan?.startDate).format(
                'YYYY.MM.DD'
              )} -${dayjs(masterPlan?.endDate).format('YYYY.MM.DD')}`"
              @back="() => null"
            >
              <template #extra>
                <a-button
                  @click="onClickSaveBtn"
                  type="primary"
                  class="save-btn"
                  >저장</a-button
                >
              </template>
            </a-page-header>

            <div class="destination">
              <div class="plan-main">
                <div class="sub-title">
                  <div class="icon-wrap">
                    <font-awesome-icon icon="location-dot" flip class="icon" />
                  </div>
                  <p>{{ destination }}</p>
                </div>
                <div>
                  <div
                    v-for="(dailyPlan, index) in dailyPlanList"
                    :key="dailyPlan.dailyPlanId"
                    class="daily-plan"
                  >
                    <div class="daily-plan-content">
                      <div>
                        <div class="day-count">
                          <font-awesome-icon icon="paper-plane" />
                          <span> Day{{ index + 1 }}</span>
                        </div>
                        <div class="date">
                          {{ dayjs(dailyPlan.planDate).format("YYYY.MM.DD") }}
                        </div>
                      </div>

                      <a-button @click="() => onClickAddCourceBtn(index)">
                        장소 추가
                      </a-button>
                    </div>
                    <a-empty
                      v-show="dailyPlan.dailyPlanDetailDtoList.length == 0"
                    />
                    <Container
                      :group-name="'1'"
                      @drop="onDrop(dailyPlan.dayNo, $event)"
                      :get-child-payload="
                        (childIndex: number) =>
                          getChildPayload(index, childIndex)
                      "
                    >
                      <Draggable
                        v-for="(
                          course, courseIndex
                        ) in dailyPlan.dailyPlanDetailDtoList"
                        :key="course.attractionId"
                      >
                        <div class="course-item">
                          <div class="item-content">
                            <p class="course-title">
                              {{ course.attractionDto.title }}
                              <a-tag
                                :color="
                                  contentTypeColorMap.get(
                                    course.attractionDto.contentTypeId
                                  )
                                "
                                class="content-type-tag"
                                >{{
                                  contentTypeMap.get(
                                    course.attractionDto.contentTypeId
                                  )
                                }}
                              </a-tag>
                            </p>
                            <a-input
                              v-model:value="course.memo"
                              placeholder="여행지에 대한 메모"
                            ></a-input>
                          </div>
                          <a-button
                            danger
                            :icon="h(DeleteOutlined)"
                            @click="
                              () => deleteItem(dailyPlan.dayNo, courseIndex)
                            "
                          ></a-button>
                        </div>
                      </Draggable>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <AddCourseModal
      v-if="isOpenAddCourseModal"
      :open="isOpenAddCourseModal"
      :sido-code="masterPlan?.sidoCode ? masterPlan?.sidoCode : -1"
      :gugun-code="masterPlan?.gugunCode ? masterPlan?.gugunCode : -1"
      @onClose="onCloseAddCourseModal"
      @addCourses="addCourses"
    />
  </div>
</template>

<script setup lang="ts">
import { keywordSearch, mountMap, addMarker } from "@/lib/mapUtli.js";
import { onMounted, ref, h } from "vue";
import { requestEditPlanDetails, requestGetMasterPlan } from "../api";
import { Course, DetailPlanParam, MasterPlan, DailyPlan } from "..";
import * as dayjs from "dayjs";
import AddCourseModal from "../components/AddCourseModal.vue";
import { Attraction } from "@/features/attraction";
import { Container, Draggable } from "vue3-smooth-dnd";
import { DropResult } from "smooth-dnd";
import { contentTypeMap, sidoCodeNameMap, sidoGugunMap } from "@/util/code";
import { contentTypeColorMap } from "../util/TypeMap";
import { DeleteOutlined } from "@ant-design/icons-vue";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const isLoadingMap = ref(true);
const dailyPlanList = ref<DailyPlan[]>([]);
const isOpenAddCourseModal = ref(false);
const selectedDayIndex = ref(-1);
const masterPlan = ref<MasterPlan | null>(null);
const router = useRouter();
const userInfo = useUserStore().userInfo;

let destination = "";
const { planMasterId } = defineProps<{ planMasterId: number }>();

onMounted(() => {
  mountMap(37.566826, 126.9786567, 2);
  setMiddle();
  getinitialData();
});

const getinitialData = async () => {
  try {
    const res = await requestGetMasterPlan(planMasterId, false);
    masterPlan.value = res;
    dailyPlanList.value = masterPlan.value.dailyPlanDtoList;
    setDestination();
  } catch (e) {
    console.error(e);
  }
};

const setDestination = () => {
  if (masterPlan.value && masterPlan.value.sidoCode) {
    destination += sidoCodeNameMap.get(masterPlan.value.sidoCode);
    if (masterPlan.value.gugunCode && masterPlan.value.gugunCode > -1) {
      destination +=
        " " +
        sidoGugunMap
          .get(masterPlan.value.sidoCode)
          ?.get(masterPlan.value?.gugunCode);
    }
  }
};

const setMiddle = () => {
  isLoadingMap.value = true;
  const res = keywordSearch(destination);
  if (res) {
    isLoadingMap.value = false;
    setMarker();
  } else {
    setTimeout(() => {
      setMiddle();
    }, 100);
  }
};

const setMarker = () => {
  if (!isLoadingMap.value) {
    for (let dailyPlan of dailyPlanList.value) {
      for (let course of dailyPlan.dailyPlanDetailDtoList) {
        addMarker(
          course.attractionDto.latitude,
          course.attractionDto.longitude
        );
      }
    }
  }
};

const onClickSaveBtn = async () => {
  const detailPlanPropList: DetailPlanParam[] = [];
  let orderNo;
  for (let dailyPlan of dailyPlanList.value) {
    orderNo = 0;
    for (let course of dailyPlan.dailyPlanDetailDtoList) {
      orderNo++;
      detailPlanPropList.push({
        dailyPlanId: dailyPlan.dailyPlanId,
        attractionId: course.attractionId,
        memo: course.memo,
        orderNo: orderNo,
      });
    }
  }
  if (masterPlan.value) {
    try {
      const res = await requestEditPlanDetails(
        masterPlan.value?.planMasterId,
        detailPlanPropList
      );
      Swal.fire("success", res, "success").then(() => {
        router.push({
          name: "userInfo",
          params: {
            cusNo: userInfo?.cusNo,
          },
        });
      });
    } catch (e: any) {
      Swal.fire("error", e, "error");
    }
  }
};
const addCourses = (attractionList: Attraction[]) => {
  const currentDailyPlan = dailyPlanList.value[selectedDayIndex.value];
  if (currentDailyPlan) {
    const courseList = currentDailyPlan.dailyPlanDetailDtoList;
    for (const attraction of attractionList) {
      const course: Course = {
        dailyPlanId: currentDailyPlan.dailyPlanId,
        attractionId: attraction.contentId,
        attractionDto: attraction,
        memo: "",
        reviewContent: "",
      };
      courseList.push(course);
    }
  }
  setMarker();
};

const deleteItem = (dayNo: number, courseIndex: number) => {
  dailyPlanList.value[dayNo - 1].dailyPlanDetailDtoList.splice(courseIndex, 1);
};

const onDrop = (dayno: number, dropResult: DropResult) => {
  dailyPlanList.value[dayno - 1].dailyPlanDetailDtoList = applyDrag(
    dailyPlanList.value[dayno - 1].dailyPlanDetailDtoList,
    dropResult
  );
};

const applyDrag = (arr: Course[], dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  return result;
};

const getChildPayload = (dailyPlanIndex: number, courseIndex: number) => {
  return dailyPlanList.value[dailyPlanIndex].dailyPlanDetailDtoList[
    courseIndex
  ];
};

const onClickAddCourceBtn = (dailyPlanId: number) => {
  isOpenAddCourseModal.value = true;
  selectedDayIndex.value = dailyPlanId;
};

const onCloseAddCourseModal = () => {
  isOpenAddCourseModal.value = false;
};
</script>

<style scoped lang="scss">
.root {
  display: flex;
  gap: 2%;
  #map {
    width: 40vw;
    height: 84vh;
    border-radius: 1rem;
  }
}

.right-side {
  width: 100%;
}

.plan-main {
  padding: 0 2rem 2rem 2rem;
}

.sub-title {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  .icon-wrap {
    display: inline-block;
    padding: 1rem;
    background-color: $blue-1;
    border-radius: 1rem;
    .icon {
      color: $primary;
      font-size: 1.2rem;
    }
  }
  p {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
.destination {
  height: 73vh;
  overflow-y: scroll;
}
.daily-plan {
  .daily-plan-content {
    height: auto;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 2rem;
    justify-content: space-between;
    > div {
      display: flex;
    }
    .day-count {
      display: flex;
      width: auto;
      height: 31px;
      -webkit-box-align: center;
      align-items: center;
      padding: 6px 10px;
      box-sizing: border-box;
      background: $gray-10;
      color: white;
      font-weight: 600;
      border-radius: 20px;
      gap: 0.5em;
      span {
        font-weight: 600;
        font-size: 13px;
        line-height: 19px;
        margin-left: 3px;
        color: rgb(255, 255, 255);
      }
    }

    .date {
      width: auto;
      height: 31px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-left: 21px;
      font-weight: 400;
      font-size: 13px;
      line-height: 31px;
      color: rgb(106, 106, 106);
      position: relative;
      &::before {
        display: block;
        content: "";
        width: 1px;
        height: 10px;
        background: rgb(219, 219, 219);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -10px;
      }
    }
  }
}
.course-item {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid $gray-5;
  cursor: pointer;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 0.7rem;
  background-color: white;
  margin: 0.5rem 0;
  transition: 0.2s linear;
  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
  .item-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
  }
}
</style>
