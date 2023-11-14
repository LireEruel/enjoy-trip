<template>
  <div>{{ attraction.contentId }}</div>
</template>

<script setup lang="ts">
import { Attraction } from "../types";

const { attraction } = defineProps<{ attraction: Attraction }>();
</script>

<style scoped lang="scss"></style>
