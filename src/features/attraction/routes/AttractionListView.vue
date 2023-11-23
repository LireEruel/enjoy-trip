<template>
  <div class="root">
    <div class="heading">
      <h1>{{ sidoList[selectedSido].name }}의 명소 알아보기</h1>
      <a-space align="center" class="option-bar">
        <a-select
          v-model:value="selectedSido"
          style="width: 120px"
          :options="sidoList"
          :field-names="{ label: 'name', value: 'key' }"
          size="large"
        ></a-select>

        <a-select
          v-model:value="selectedGugun"
          style="width: 120px"
          :options="gugunList"
          :field-names="{ label: 'name', value: 'key' }"
          size="large"
        ></a-select>
      </a-space>
    </div>
    <div class="attraction-list-wrap">
      <attraction-list
        :attraction-list="attractionList"
        class="attraction-list"
      ></attraction-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { sidoGugunMap, sidoCodeList } from "@/util/code";
import { Attraction } from "../types";
import { requestAttractionList } from "../api";
import AttractionList from "../components/AttractionList.vue";
import { throttle } from "lodash";
const bestAttractions: Attraction[] = [
  {
    contentId: 317503,
    contentTypeId: 12,
    title: "분황사",
    description:
      "분황사(芬皇寺)는 대한불교조계종 제11교구 본사 불국사의 말사이다. 분황사는 황룡사지와 잇닿아 있으면서 국보로 지정돼 있는 모전석탑으로도 유명하다. 선덕여왕 3년(634)에 건립된 것으로 알려지고 있으며, 우리 민족이 낳은 위대한 고승 원효와 자장이 거쳐간 사찰로 명성이 높다. 선덕여왕 3년(634년)에 지어진 절로서, 원효대사가 거주하면서 화엄경소를 쓴 곳이다. 솔거가 그린 관음보살상, 경덕왕 14년(755년)에 불상주조의 대가인 강고 내말이 만든 약사여래상이 있었다. 선덕여왕의 권유로 자장법사도 오래 머물렀으며, 원효의 아들인 설총은 원효대사가 돌아가신 후 아버님의 소상을 만들어 모셨고 이 소상은 고려후기까지 있었다고 전해진다. 원효가 이곳에서 해동종을 완성했다고 하여 해동종을 분황종이라고도 한다. 이 절은 평지 일탑 일금당의 가람배치로서 다른 사찰에서 보듯 중문, 탑, 금당을 중심으로 회랑같은 것이 있었을 것이나 절터의 발굴조사가 이루어지지 않아 확실치는 않다. 통일신라 이전에 세운 모전탑으로 원형은 5층인지 7층인지 9층인지 알 수 없으나 그 중에서 지금은 3층(국보)만 남아있다. 신라탑은 전탑양식이 유행하여 백제의 미륵사지 목탑구조 모방 전탑과 결합하여 통일신라 석탑의 정형을 이루었다. 통일산라의 모전탑 및 전탑은 안동, 의성, 제천 등지에 남아있다. 임진왜란때에 왜구들이 이 탑을 반쯤 헐어갔다고 한다. 이 탑은 바다속의 안산암을 갈아서 쌓은 것으로 1915년 탑을 수리하다가 사리장치가 든 돌 상자 속에서는 구슬과 금은으로 된바늘, 고려시대 화폐가 발견됨으로써 고려시대에도 보수가 있었음을 알 수가 있다. 바늘은 탑을 건립한 선덕여왕과 관계되는 것으로 추정된다. 이 탑에는 1층 탑신 4면에 감실을 만들고 돌문을 달았으며 이 입구마다 좌우로 수문장인 금강역사상이 있고, 탑에는 돌사자가 놓여 있다. 금강역사상은 조각이 아름답고 입체감이 두드러져 삼국시대 조각기법을 잘보여 주고 있다. 분황사 사찰내에 마련되어 있는 돌우물이다. 바위틈 사이로 솟아 오르거나 흘러 내리는 물이 잘 고이도록 바위를 움푹하게 판 뒤, 그 위에 다시 돌을 쌓아 시설해 놓은 모습으로, 겉면은 8각을 이루고, 안쪽의 벽은 둥근 원형을 이루고 있다. 분황사 경내, 당시의 우물 석정에는 아직도 물이 마르지 않고 있는데 이 우물 속에 호국용이 살았다는 전설이 있다. ‘호국룡변어정’이라고도 불리는 이 우물에는 분황사 우물과 금학산 기슭 동천사의 동지와 청지라는 우물에는 각각 통일신라를 지키는 세 마리의 호국룡이 살고 있었다. 원성왕 11년(795) 중국 당나라 사신이 이 용들을 물고기로 변신시켜 잡아가니, 두 여인이 왕 앞에 나타나 이 사실을 아뢰며 남편을 찾아줄 것을 아뢰었다. 두 여인의 말을 들은 왕은 사람을 시켜 물고기를 다시 빼앗은 후 각각의 우물에 놓아주었다. 1965년 우물 속에서 14구의 목이 부러진 석불들이 출토되었고이 석불들은 경주국립박물관 경내에 전시되고 있다. 남아있는 통일신라시대의 돌우물 가운데 가장 크고 우수한 것이며, 현재에도 사용될 만큼 보존 상태가 양호하며, 초석의 규모로 보아 당시에는 대단히 큰 규모의 사찰이었음을 알수 있다. 지금의 약사전은 조선시대에 세워졌다. 현재 분황사 경내에는 분황사 모전석탑과 화쟁국사비적, 삼룡변어정(8각 석정)이라는 우물, 경상북도 문화재자료로 지정된 분황사약사여래입상 등이 있으며 석등과 대석 같은 많은 초석들과 허물어진 탑의 부재였던 벽돌 모양의 돌들이 한켠에 단정하게 쌓여 있다. 분황사화쟁국사비부는 분황사 내의 우물 옆에 놓여 있는 것으로, 원효대사를 기리는 비의 받침돌이다. 낮은 직육면체의 모습을 하고 있는데, 네 모서리가 떨어져 나가 많이 훼손되었다. 윗면에는 비를 꽂아두기 위한 홈이 파 놓았고, 옆면에는 옅은 안상(眼象)을 새겼다. 고려 명종대(1170∼1197) 한문준이 건립한 화쟁국사비의 대석이 남아있는데, 원효대사를 위한 비석이나 시호(諡號 : 죽은 이의 덕을 기리어 붙여주는 호)가 없음을 애석하게 여긴 왕이 ‘대성화쟁국사(大聖和諍國師)’라는 시호를 내리고 비석을 세우도록 하였다. 오랫동안 방치되어 오다가 김정희가 절 근처에서 발견하여 이를 확인하는 글귀를 받침돌에 새겨두었다. 비는 임진왜란 후까지도 보존되었으나, 지금은 이 받침돌만이 남아있다.",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=7d02d9fc-a52c-4b5d-8597-3949c183c46b",
    addr1: "경상북도 경주시 분황로 94-11",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 572968,
    contentTypeId: 12,
    title: "따라비 오름",
    description:
      "3개의 굼부리가 있는 것이 가장 큰 특징이다. 크고 작은 여러 개의 봉우리가 매끄러운 등성이로 연결되어 한 산체를 이룬다. 말굽형으로 열린 방향의 기슭쪽에는 구좌읍 `둔지오름`에서와 같은 이류구들이 있다. 이류구가 있는 것으로 보아 비교적 최근에 분출된 신선한 화산에 속하는 것으로 판단된다고 한다. 화산체가 형성된 후에 용암류가 분출, 화구륜의 일부가 파괴되어 말굽형을 이루게 용암의 흐름과 함께 이동된 이류(泥流)가 퇴적한 것 호칭이 여러개가 있고 그 어원에 대한 해석이 구구함. 주위의 묘비에는 대개 地祖岳(지조악) 또는 地翁岳(지옹악)으로 표기돼 있고, 多羅肥(다라비)라는 것도 보이며, 한글로는 따라비라 적힌 것도 있다고 한다. 옛 지도에는 지조악이라는 것은 찾아볼 수 없다고 하며 多羅非(다라비)로 나온다고 한다.",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=793ac091-5507-46fb-88d2-af06966935ab",
    addr1: "제주특별자치도 서귀포시 표선면 가시리 산62",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 2606216,
    contentTypeId: 12,
    title: "사천바다 케이블카",
    description:
      " 바다와 산을 동시에 운행하는 국내 최초의 케이블카로 바다 또는 산으로만 운행하던 기존 케이블카들의 아쉬움을 한번에 해결할 수 있어 탑승객들의 만족도가 높다.총 연장 2.43km는 국내 최장거리(19년 6월 기준)으로 약 25분간 케이블카에 탑승하며, 각산정류장에 하차하여 전망대에 올라 사천바다의 아름다운 풍광을 감상할 수 있다.케이블카를 타고 이동하는 중에는 낚시를 즐기기 위해 바다에 떠 있는 배들이 한폭의 수채화를 보는 듯한 기분을 들게 만들기도 하며, 때때로 토종 돌고래인 '상괭이'를 만나볼 수도 있다. 케이블카는 왕복 기준 대방정류장에서 초양정류장과 각산정류장을 거쳐 다시 대방정류장으로 오는 코스로 총 42대의 캐빈(일반캐빈 28대, 크리스탈캐빈 14대)이 운행된다.",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a48f007b-043f-4cbc-a706-330ae504b6f1",
    addr1: "경상남도 사천시 사천대로 18",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 2613675,
    contentTypeId: 14,
    title: "미술관 자작나무숲",
    description:
      "우천면 두곡리에 있는 사립 미술관으로 1995년부터 관장의 스튜디오로 사용되던 공간을 2008년부터 미술관 소장품의 일부를 전시해 관람객에게 개방하고 있다.두 개의 전시장으로 구분돼 있으며, 각각의 아트상품도 준비돼 있는 미술관이다.자작나무숲은 정원과 야외무대, 숲 속의 집으로 구분된다. 정원은 미술관의 전시장이라 불리우는 모든 실내공간을 말하며, 야외무대는 아티스트들이 작품을 통해 관객과 교감하는 장소다. 숲 속의 집은 게스트하우스로 조용히 숲 속에서 휴식을 할 수 있는 공간이다. 원하는 경우 스튜디오 갤러리에서 음료 한 잔을 마실 수 있다. (출처 : 강원도청)",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=b0e65522-46b5-4539-b7ba-d60a5fcb85bf",
    addr1: "강원도 횡성군 우천면 한우로두곡5길 186",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 2616157,
    contentTypeId: 12,
    title: "남서일몰전망대",
    description:
      "울릉군 남서리에 있는 산에 위치한 남서일몰전망대는 해발고도 150m 지점에 있다. 망향봉의 독도전망대, 저동리의 내수전전망대와 함께 일출과 일몰이 뛰어난 대표적인 전망대로 손꼽히고 있다. 전망대에 서면 사태구미 해안변에 단애절벽이 병풍처럼 펼쳐지며 바다 위로 떨어지는 일몰 풍경이 절경이다. 전망대 앞쪽에는 소원을 빌면 자식을 볼 수 있고 부부의 정이 깊어진다는 남근바위가 솟아 있으며, 건너편 산자락에서는 색시바위가 있다.",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=dea9e449-3e78-4845-a6a5-6fe0993fe136",
    addr1: "경상북도 울릉군 서면 남서리",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 2633924,
    contentTypeId: 12,
    title: "시흥배곧한울공원 해수체험장",
    description:
      "이국적인 느낌이 물씬 풍기는 해수체험장은 한울 공원 인기 포토존으로 많은 사람들이 찾는 지역 명소이며, 해수체험장 앞으로 펼쳐진 아름 다운 바다경치는 매우 아름답다. 도심속 휴식처로 많은 시민들에게 사랑받는 곳이다. 지하 150m 암반해수 70%, 상수도 30% 비율로 운영하고 있으며, 매주 수질 관리를 위해 해수 교체 및 청소를 진행하고 있어 이용객들이 쾌적하고 안전한 해수체험을 할 수 있도록 노력하고 있다.",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=31e178a8-756b-4685-8e2e-bd133c15f9f3",
    addr1: "경기도 시흥시 해송십리로 61 (정왕동)",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 2758192,
    contentTypeId: 12,
    title: "올림픽공원들꽃마루",
    description:
      "올림픽공원 사거리 인근 장미공원에서부터 한성백제박물관 사이 자그마한 언덕 경사로에 마련된 대규모 야생화 단지이다. 2,800㎡에 이르는 면적에 경사로 맨 꼭대기에는 원두막이 놓여 있고 자그마한 오솔길을 마련해 양 옆으로 광대한 꽃밭을 만들어 놓았다. 계절마다 각기 다른 야생화를 심어 놓아 들꽃의 향연을 즐길 수 있는 올림픽공원의 대표적인 포토존 중의 한 곳이다.",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a4aadc1e-2cf6-43c8-91bc-e27a75472dcc",
    addr1: "서울특별시 송파구 올림픽로 424 (방이동)",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
  {
    contentId: 2841245,
    contentTypeId: 12,
    title: "임진강댑싸리공원",
    description:
      "임진강 댑싸리 공원은 연천 삼곶리 돌무지무덤 앞 약 3만㎡ 규모로 댑싸리 2만여 그루를 심어 공원으로 조성한 곳이다. 댑싸리 외에 황화 코스모스, 국화, 백일홍, 천일홍, 마리골드, 일일초, 칸나 등 다양한 꽃들도 볼 수 있다. ‘겸허, 청초한 미인’의 꽃말을 가진 댑싸리는 8월 말부터 불긋불긋해지고 9월 초 분홍색과 빨간색, 주황색으로 물들어 이색적인 분위기를 연출한다. 임진강 댑싸리 공원은 가족, 연인과 조용히 자연을 즐기면서 인생 사진을 남길 수 있는 곳으로 서울 근교에 자리해 당일치기 여행이 가능하다. 주변에 태풍전망대와 군남홍수조절지 두루미테마파크 등도 함께 관광할 수 있다. ※반려동물 동반 가능 (단, 개목줄 착용, 배설물 처리를 위한 비닐봉지 등을 구비한 이용객에 한하여 허용)",
    firstImage:
      "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=29abbebf-86df-49e8-971e-78bac9b33efa",
    addr1: "경기도 연천군 중면 삼곶리422",
    addr2: "",
    isMyLike: 1,
    isPartenerLike: 1,
    latitude: 0,
    longitude: 0,
  },
];
const sidoList = [{ key: 0, name: "대한민국" }, ...sidoCodeList];
const gugunList = computed(() => {
  const gugunMap = sidoGugunMap.get(selectedSido.value);
  if (gugunMap) {
    const newGugunList = Array.from(gugunMap).map(([key, name]) => ({
      key,
      name,
    }));
    return [{ key: 0, name: "전체" }, ...newGugunList];
  } else return [{ key: 0, name: "전체" }];
});

const selectedSido = ref(0);
const selectedGugun = ref(0);

const attractionList = ref<Attraction[]>(bestAttractions);

const page = ref(1);
const totalAttractionCount = ref(0);
const currentAttractionCount = ref(0);

watch(selectedSido, async () => {
  selectedGugun.value = 0;
  await resetPagination();
});

watch(selectedGugun, async () => {
  await resetPagination();
});

onMounted(() => {
  window.addEventListener("scroll", throttle(handleScroll, 300), {
    passive: true,
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const resetPagination = async () => {
  page.value = 1;
  totalAttractionCount.value = 0;
  currentAttractionCount.value = 0;
  attractionList.value = [];
  await getAttractionList();
};

const getAttractionList = async () => {
  try {
    const res = await requestAttractionList({
      pgno: page.value,
      sidoCode: selectedSido.value,
      gugunCode: selectedGugun.value,
      pageSize: 20,
    });
    console.log(res);
    totalAttractionCount.value = res.totalCount;
    attractionList.value = [...attractionList.value, ...res.list];
    currentAttractionCount.value = attractionList.value.length;
  } catch (e) {
    console.error(e);
  } finally {
    page.value++;
  }
};

function handleScroll() {
  const { scrollTop, offsetHeight, scrollHeight } = document.documentElement;
  if (scrollTop + offsetHeight >= scrollHeight - 300) {
    // 페이지 끝에 거의 다다랐는지 확인
    getAttractionList();
  }
}
</script>

<style scoped lang="scss">
.heading {
  h1 {
    text-align: center;
    font-size: 3rem;
    margin: 2rem;
  }
}
.option-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
