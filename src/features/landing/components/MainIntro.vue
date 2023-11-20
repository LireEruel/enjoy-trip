<template>
  <main class="intro-section">
    <div class="container">
      <a-row>
        <a-col class="gutter-row" :gutter="24">
          <ul class="slider" :span="24">
            <li
              v-for="item in placeInfoList"
              :key="item.id"
              class="slider-item"
              v-bind:class="{ active: currentId == item.id }"
            >
              <a-row
                :gutter="24"
                class="item-content"
                align="middle"
                justify="center"
              >
                <a-col class="gutter-row hide-mobile" :span="4">
                  <div class="intro">
                    <a href="#">
                      <h1 class="title">
                        <span class="underline">Explore {{ item.name }}</span>
                      </h1>
                    </a>
                  </div>
                </a-col>
                <a-col class="gutter-row" :span="20">
                  <div class="image-holder">
                    <img :src="item.imgUrl" />
                  </div>
                  <a-row>
                    <a-col :span="18">
                      <div class="intro show-mobile">
                        <a href="#">
                          <h1 class="title">
                            <span class="underline"
                              >Explore {{ item.name }}</span
                            >
                          </h1>
                        </a>
                      </div>
                      <p class="description">
                        {{ item.description }}
                      </p>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </li>
          </ul>
        </a-col>
      </a-row>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import JejuImg from "../assets/imgs/Jeju.jpg";
import MilYangImg from "../assets/imgs/MilYang.jpg";
import GwangJuImg from "../assets/imgs/GwangJu.jpg";
import PyongChangImg from "../assets/imgs/PyongChang.jpg";
import SeoulImg from "../assets/imgs/Seoul.jpg";

type PlaceInfo = {
  id: number;
  name: string;
  imgUrl: string;
  description: string;
};
const placeInfoList: PlaceInfo[] = [
  {
    id: 0,
    name: "제주도",
    imgUrl: JejuImg,
    description:
      "섬 전체가 하나의 거대한 관광자원인 제주도. 에메랄드빛 물빛이 인상적인 협재 해수욕장은 제주 대표 여행지며, 파도가 넘보는 주상절리와 바다 위 산책로인 용머리 해안은 제주에서만 볼 수 있는 천혜의 자연경관으로 손꼽힌다. ",
  },
  {
    id: 1,
    name: "밀양",
    imgUrl: MilYangImg,
    description:
      "3대 신비가 숨어있는 밀양. 천황산 산 중턱에 있는 얼음골 계곡은 한여름에 얼음이 얼고 처서가 지날 무렵부터 얼음이 녹는 이상 기온 지대이다. ",
  },
  {
    id: 2,
    name: "광주",
    imgUrl: GwangJuImg,
    description:
      "문화예술의 중심지라 불리는 광주광역시. 예향의 본고장답게 '맛'과 '멋'이 조화를 이루며 남도의 문화를 이끌어 왔다고 해도 과언이 아니다.",
  },
  {
    id: 3,
    name: "평창",
    imgUrl: PyongChangImg,
    description:
      "자연 경관이 아름다운 평창. 드넓은 푸른 초원이 펼쳐진 대관령 양떼목장은 평창 대표 관광지이다. 풍차길이 매력적인 선자령은 백패킹의 성지로 알려져 있으며, 햐얀 눈꽃으로 수놓은 메밀꽃밭도 여행 코스로 빼놓을 수 없다. ",
  },
  {
    id: 4,
    name: "서울",
    imgUrl: SeoulImg,
    description:
      "대한민국의 수도인 서울을 지방자치단체인 특별시로 부르는 명칭이다. 한반도 중앙에 있으며, 한강을 사이에 두고 남북으로 펼쳐져 있다. ",
  },
];

const currentId = ref(0);
// const onClickPrevious = () => {
//   if (currentId.value == 0) {
//     currentId.value = placeInfoList.length - 1;
//   } else {
//     currentId.value--;
//   }
// };
const onClickAfter = () => {
  if (currentId.value == placeInfoList.length - 1) {
    currentId.value = 0;
  } else {
    currentId.value++;
  }
};

// 3초에 한번씩 onClickAfter 실행시키기

setInterval(() => {
  onClickAfter();
}, 4000);
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Barlow:400,500,700");

$white: #fff;
$black: #232323;
$gray: #8d8d8d;
$red: #e83f43;
$md: 900px;

* {
  box-sizing: border-box;
  &::before,
  &::after {
    box-sizing: border-box;
  }
}

.intro-section {
  margin: 4% 0;
  font-family: "Barlow", sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
  color: $gray;
  background: $white;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
.container {
  margin: auto;
  padding: 0 1rem;
  max-width: 71.25rem;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
}

a {
  color: $gray;
  text-decoration: none;
  &:hover {
    color: $black;
  }
}

nav {
  position: relative;
  z-index: 2;
  padding: 1.25rem 0 1.25rem 0;
  ul {
    line-height: 2.2;
    display: flex;
    justify-content: flex-start;
    li {
      margin: 0.325rem 0;
    }
  }
}

#logo {
  color: $black;
  font-weight: 700;
  font-size: 1.125rem;
}

#highlight {
  color: $red;
}

img {
  width: 100%;
  height: 43vh;
  object-fit: cover;
}

.vertical {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intro {
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 0.8s 0.4s ease forwards;
  .title {
    display: inline-block;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.1;
    text-decoration: underline;
    color: $red;
    .underline {
      color: $black;
    }
  }
}

.description {
  position: relative;
  z-index: 1;
  margin: 1rem 0 1.5rem 0;
  font-size: 1rem;
  opacity: 0;
  animation: fadeIn 0.8s 0.6s ease forwards;
}

.slider-item {
  display: none;
  &.active {
    display: block;
    .hide-mobile {
      display: none;
    }
    .show-mobile {
      display: block;
      margin: 1rem 0;
    }
  }
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font: inherit;
  font-size: inherit;
  width: 55px;
  height: 55px;
}

.controls {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 0 0.25rem 0;
  .previous {
    border: 1px solid $black;
  }
  .next {
    border-top: 1px solid $black;
    border-right: 1px solid $black;
    border-bottom: 1px solid $black;
  }
  .icon {
    position: relative;
    margin: auto;
    width: 20px;
    height: 1px;
    background-color: currentColor;
    &.arrow-left {
      &::before {
        content: "";
        position: absolute;
        left: 1px;
        top: -4px;
        width: 9px;
        height: 9px;
        border-top: solid 1px currentColor;
        border-right: solid 1px currentColor;
        transform: rotate(-135deg);
      }
    }
    &.arrow-right {
      &::before {
        content: "";
        position: absolute;
        right: 1px;
        top: -4px;
        width: 9px;
        height: 9px;
        border-top: solid 1px currentColor;
        border-right: solid 1px currentColor;
        transform: rotate(45deg);
      }
    }
  }
}

.previous,
.next {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-basis: 15%;
  font-size: 2rem;
  color: $black;
  &:hover .icon {
    transform: scale(1.5);
  }
  .icon {
    transition: transform 0.1s ease;
  }
}

.active .image-holder::before {
  position: absolute;
  content: "";
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $white;
  transform-origin: 100% 50%;
  animation: revealRight 1s cubic-bezier(0.23, 1, 0.75, 1) forwards;
}

@keyframes revealRight {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(20%);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

.toggle-nav {
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  line-height: 1.9;
  i {
    font-size: 1.5rem;
    line-height: 1.3;
    margin: 0 0 0 0.5rem;
  }
}

.flex-nav ul {
  position: absolute;
  z-index: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  display: none;
  width: 100%;
  left: 0;
  padding: 1rem;
  background: $white;
  text-align: center;
  &.active {
    display: flex;
  }
}

@media (min-width: $md) {
  nav ul {
    justify-content: flex-end;
  }

  #logo {
    font-size: 1.25rem;
  }

  .controls {
    padding: 1.75rem 0 1.75rem 0;
  }

  .intro {
    animation: fadeInLeft 0.8s 0.4s ease forwards;
    .title {
      font-size: 4rem;
      padding: 2rem 2rem 3rem 2rem;
      background: $white;
    }
  }

  img {
    height: 27rem;
  }

  .description {
    font-size: 1.25rem;
    height: 5rem;
  }

  .previous,
  .next {
    flex-basis: 8.33%;
  }

  .slider-item.active .hide-mobile {
    display: block;
  }

  .slider-item.active .show-mobile {
    display: none;
  }

  .toggle-nav {
    display: none;
  }

  .flex-nav ul {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 0;
    justify-content: flex-end;
  }

  nav {
    padding: 1.75rem 0 1.75rem 0;
    ul {
      line-height: 2.2;
      display: flex;
      justify-content: flex-start;
      li {
        font-size: 1rem;
        text-transform: uppercase;
        margin: 0 2rem 0 0;
        &:nth-child(3) {
          margin: 0;
        }
      }
    }
  }
}

@media (max-width: $md) {
  .hide-mobile {
    display: none;
  }
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
