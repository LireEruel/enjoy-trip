<template>
  <div>
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

<style scoped lang="scss"></style>
