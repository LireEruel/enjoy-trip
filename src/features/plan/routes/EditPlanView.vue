<template>
  <a-row justify="center">
    <a-col span="20">
      <div class="root">
        <a-spin :spinning="isLoadingMap">
          <div id="map"></div>
        </a-spin>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { keywordSearch, mountMap } from "@/lib/mapUtli.js";
import { onMounted, ref } from "vue";

let map: null = null;
const isLoadingMap = ref(true);

onMounted(() => {
  mountMap(map, 37.566826, 126.9786567, 2);
  setMiddle();
});

const setMiddle = () => {
  isLoadingMap.value = true;
  const res = keywordSearch("대구");
  if (res) {
    isLoadingMap.value = false;
  } else {
    setTimeout(() => {
      setMiddle();
    }, 100);
  }
};
</script>

<style scoped lang="scss">
.root {
  display: flex;

  #map {
    width: 500px;
    height: 500px;
  }
}
</style>
