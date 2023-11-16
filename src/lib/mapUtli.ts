declare global {
  interface Window {
    kakao: any;
  }
}
let latitude = 0;
let longitude = 0;
let level = 0;
let map: any = null;
let ps: any = null;

const mountMap = async (
  _map: any,
  _latitude: number,
  _longitude: number,
  _level: number
) => {
  latitude = _latitude;
  longitude = _longitude;
  level = _level;
  map = _map;

  const script = document.createElement("script");
  /* global kakao */
  script.onload = () => window.kakao.maps.load(initMap);
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=49c41bd6197ebea05e29425dd6780f25&libraries=services,clusterer,drawing`;
  document.head.appendChild(script);
};

const initMap = () => {
  const container = document.getElementById("map");

  const options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: level,
  };
  // 지도 객체를 등록합니다.
  // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new window.kakao.maps.Map(container, options);
  ps = new window.kakao.maps.services.Places();
};

const addMarker = (latitude: number, longitude: number) => {
  // 마커가 표시될 위치입니다
  var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

  // 마커를 생성합니다
  var marker = new window.kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);
};
const keywordSearch = (keyword: string) => {
  try {
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);
    return true;
  } catch {
    return false;
  }
};

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data: any, status: any) {
  if (status === window.kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var bounds = new window.kakao.maps.LatLngBounds();

    for (var i = 0; i < data.length; i++) {
      bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

export { mountMap, initMap, addMarker, keywordSearch };
