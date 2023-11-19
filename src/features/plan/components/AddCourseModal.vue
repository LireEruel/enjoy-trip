<template>
  <a-modal
    :open="open"
    title="추천 장소"
    @ok="onOkModal"
    @cancel="emit('onClose')"
    width="1000px"
  >
    <a-input-search
      v-model:value="inputText"
      placeholder="input search text"
      @search="onSearch"
      :maskClosable="false"
    />
    <div class="content-type-check-wrap">
      <a-checkable-tag
        v-for="(tag, index) in tagsData"
        :key="tag"
        v-model:checked="selectTags[index]"
        @change="resetPagination"
      >
        {{ contentTypeMap.get(tag) }}
      </a-checkable-tag>
    </div>
    <div class="content-wrap">
      <div class="attraction-card-wrap">
        <div
          v-for="attraction in attractionList"
          class="attraction-card"
          @click="() => selectAttraction(attraction)"
        >
          <div class="attraction-card-content">
            <a-image
              :src="attraction.firstImage"
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              :height="70"
              :width="70"
              :preview="false"
            >
              <template #placeholder>
                <a-spin class="card-loading" />
              </template>
            </a-image>
            <div>
              <h5>
                {{ attraction.title
                }}<a-tag
                  :color="contentTypeColorMap.get(attraction.contentTypeId)"
                  class="content-type-tag"
                  >{{ contentTypeMap.get(attraction.contentTypeId) }}
                </a-tag>
              </h5>

              <a-typography-text
                :content="attraction.addr1"
                :ellipsis="true"
                class="address"
              />
            </div>
          </div>

          <a-checkbox v-model:checked="attraction.selected"></a-checkbox>
        </div>
      </div>
      <a-button
        v-show="currentAttractionCount <= totalAttractionCount"
        type="primary"
        @click="getAttractionList"
        class="load-more"
      >
        + 더보기</a-button
      >
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Attraction } from "@/features/attraction";
import { onMounted, ref } from "vue";
import { CONTENT_TYPE, contentTypeMap } from "@/util/code";
import { requestAttractionList } from "@/features/attraction/api";
const { open, sidoCode, gugunCode } = defineProps<{
  open: boolean;
  sidoCode: number;
  gugunCode: number;
}>();
type PlanAttraction = {
  selected?: boolean;
} & Attraction;
const emit = defineEmits(["onClose", "addCourses"]);
const tagsData = ref([...contentTypeMap.keys()]);
const inputText = ref("");
const selectTags = ref([true, false, false, false, false, false, false, false]);
const attractionList = ref<PlanAttraction[]>([]);
const page = ref(1);
const totalAttractionCount = ref(0);
const currentAttractionCount = ref(0);
const contentTypeColorMap = new Map<number, string>([
  [CONTENT_TYPE.관광지, "blue"],
  [CONTENT_TYPE.문화시설, "purple"],
  [CONTENT_TYPE.축제공연행사, "cyan"],
  [CONTENT_TYPE.여행코스, "pink"],
  [CONTENT_TYPE.레포츠, "pink"],
  [CONTENT_TYPE.숙박, "orange"],
  [CONTENT_TYPE.쇼핑, "red"],
  [CONTENT_TYPE.음식점, "green"],
]);
const reset = () => {
  inputText.value = "";
  selectTags.value = [true, false, false, false, false, false, false, false];
  attractionList.value = [];
  page.value = 1;
  totalAttractionCount.value = 0;
  currentAttractionCount.value = 0;
};

const onSearch = () => {
  resetPagination();
  inputText.value = "";
};

onMounted(() => {
  getAttractionList();
});
const getAttractionList = async () => {
  try {
    const selectedTags = selectTags.value
      .map((isSelected, index) => (isSelected ? tagsData.value[index] : null))
      .filter((tag) => tag !== null);

    const res = await requestAttractionList({
      title: inputText.value,
      contentTypeId: selectedTags,
      pgno: page.value,
      sidoCode: sidoCode,
      gugunCode: gugunCode,
      pageSize: 15,
    });
    if (res.list) {
      totalAttractionCount.value = res.totalCount;
      attractionList.value = [...attractionList.value, ...res.list];
      currentAttractionCount.value = attractionList.value.length;
    }
  } catch (e) {
    console.error(e);
  } finally {
    page.value++;
  }
};

const resetPagination = async () => {
  page.value = 1;
  totalAttractionCount.value = 0;
  currentAttractionCount.value = 0;
  attractionList.value = [];
  await getAttractionList();
};

const selectAttraction = (attraction: PlanAttraction) => {
  console.log(attraction);
  if (attraction.selected) {
    attraction.selected = false;
  } else {
    attraction.selected = true;
  }
};

const onOkModal = () => {
  const selectedAttraction = attractionList.value.filter(
    (attraction) => attraction.selected
  );
  emit("addCourses", selectedAttraction);
  reset();
  emit("onClose");
};
</script>

<style scoped lang="scss">
.content-type-check-wrap {
  padding: 1rem 0;
  display: flex;
}
.content-wrap {
  height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.attraction-card-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 두 개의 열을 동일한 크기로 설정 */
  gap: 1rem; /* 그리드 아이템 사이의 간격 */
}
.attraction-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  justify-content: space-between;
  border: 1px solid $gray-3;
  cursor: pointer;
  h5 {
    font-size: 1rem;
  }
  transition: all 0.2s linear;
  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
  .attraction-card-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    .content-type-tag {
      margin-left: 0.7rem;
    }
    .address {
      color: $gray-8;
    }
  }
}

.load-more {
  width: 30%;
}
</style>
