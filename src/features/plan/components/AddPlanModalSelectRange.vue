<template>
  <v-date-picker is-range v-model="dateRange"></v-date-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { startDate, endDate } = defineProps<{
  startDate: string;
  endDate: string;
}>();
const dateRange = ref({
  start: new Date(startDate),
  end: new Date(endDate),
});
</script>

<style scoped lang="scss"></style>
