<template>
  <div class="root" v-if="masterPlanInfo !== null">
    <h1>{{ masterPlanInfo.title }}</h1>
    <Flipbook class="flipbook" :pages="pages" v-slot="flipbook">
      <div class="flipbook-head">
        <button @click="flipbook.flipLeft">뒤로</button>
        <button @click="flipbook.flipRight">앞으로</button>
      </div>
    </Flipbook>
  </div>
  <div v-else>
    <a-skeleton></a-skeleton>
  </div>
</template>

<script setup lang="ts">
import Flipbook from "flipbook-vue";
import { ref } from "vue";
import { MasterPlan, requestGetMasterPlan } from "..";

const pages = ref([
  "",
  "https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDExMTdfMjQx%2FMDAxNjA1NjAzNDU0MzAz.6Fwb-8dZDiLUbdfw4xwQeNwQIL9hsE19w-P1QgM8gpsg.SRxYBA_7goYJdpZ6EZGEtZGafpDpuEOs9LZPXVK2g8Ag.JPEG.bolam618%2F20201117%25A3%25DF113515.jpg&type=l340_165",
  "https://images.pexels.com/photos/2709385/pexels-photo-2709385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/3081752/pexels-photo-3081752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/3083250/pexels-photo-3083250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
]);

const { planMasterId } = defineProps<{ planMasterId: number }>();
const masterPlanInfo = ref<MasterPlan | null>(null);
masterPlanInfo.value = await requestGetMasterPlan(planMasterId, false);
</script>

<style scoped lang="scss">
.flipbook {
  width: 90vw;
  height: 90vh;
}
</style>
