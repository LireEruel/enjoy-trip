<template>
  <div class="attraction-list">
    <attraction-list-card
      v-for="attraction in attractionList"
      :key="attraction.contentId"
      :attraction="attraction"
    ></attraction-list-card>
  </div>
</template>

<script setup lang="ts">
import { Attraction } from "../types";
import AttractionListCard from "./AttractionListCard.vue";

const props = defineProps<{ attractionList: Attraction[] }>();

console.log(props.attractionList);
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
