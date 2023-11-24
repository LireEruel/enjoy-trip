<template>
  <div>
    <h1>모두의 추억을 함께 느껴보세요</h1>

    <div class="review-wrap">
      <img :src="Jeju" />
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTAzMjFfMjc0%2FMDAxNTUzMTU4OTc1Nzky.6v90YSFrqvOq-D2VYWzuaDJR7qLK4IIxTeA5brTCToEg.kvGIvrtdZTXRk45eG3vBCXgbM5atFqMMemZjEceF9u4g.JPEG.pumptong%2F20190224_152909.jpg&type=sc960_832"
      />
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20130820_180%2Fyakulete_13769606583070k8tM_JPEG%2FIMG_4730.JPG&type=sc960_832"
      />
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzEyMDRfMjU1%2FMDAxNTEyMzgxNjYzMDE1.cXlj1SQoma0Oqx9v-D47YUHTo6daOE2BbBZgdBaP7rog.mLOOoQUluQKutw95ViXyYM0Ibwd20_NnkMDpb6khPGog.JPEG.oksun724%2F%25C0%25E5%25C5%25C2%25BB%25EA%25C0%25C7_%25B0%25A1%25C0%25BB-%25B9%25CE%25BF%25C1%25BC%25B1.jpg&type=sc960_832"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Jeju from "../assets/imgs/Jeju2.jpg";
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
}

.review-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 1200px;
  margin: 10rem auto;
  gap: 2rem;
  img {
    cursor: pointer;
    width: 20vw;
    height: 20vw;
    &:hover {
      transform: scale(1.1);
    }
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.3s;
  }
}
</style>
