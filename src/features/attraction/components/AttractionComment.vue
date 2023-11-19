<template>
  <a-comment>
    <template #author
      ><a>{{ review?.writerName }}</a></template
    >
    <template #content>
      <p class="title">{{ review?.title }}</p>
      <p class="content">
        {{ review?.content }}
      </p>
    </template>
    <template #datetime>
      <a-tooltip
        :title="dayjs(review?.registerTime).format('YYYY-MM-DD HH:mm:ss')"
      >
        <span>{{ dayjs(review?.registerTime).fromNow() }}</span>
      </a-tooltip>
    </template>
  </a-comment>
</template>

<script setup lang="ts">
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AttractionReview } from "../index.js";

dayjs.extend(relativeTime);

const { review } = defineProps<{ review: AttractionReview }>();
</script>

<style scoped lang="scss">
@import "@/assets/_colors.scss";
.title {
  font-size: 1.2rem;
  color: $gray-10;
}

.content {
  color: $gray-8;
}
</style>
