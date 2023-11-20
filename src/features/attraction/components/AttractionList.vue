<template>
  <div class="attraction-list">
    <attraction-list-card
      v-for="attraction in attractionList"
      :key="attraction.contentId"
      :attraction="attraction"
      @click="() => goDetail(attraction.contentId)"
    >
    </attraction-list-card>
  </div>
</template>

<script setup lang="ts">
import { Attraction } from "../types";
import { useRouter } from "vue-router";
import AttractionListCard from "./AttractionListCard.vue";

const { attractionList } = defineProps<{ attractionList: Attraction[] }>();
const router = useRouter();
const goDetail = (id: number) => {
  router.push("/attraction/" + id);
};
</script>

<style scoped lang="scss">
.attraction-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  width: 70%;
  margin: 2rem auto;
}
</style>
