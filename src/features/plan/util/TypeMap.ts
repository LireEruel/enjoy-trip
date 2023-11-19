import { CONTENT_TYPE } from "@/util/code";

export const contentTypeColorMap = new Map<number, string>([
  [CONTENT_TYPE.관광지, "blue"],
  [CONTENT_TYPE.문화시설, "purple"],
  [CONTENT_TYPE.축제공연행사, "cyan"],
  [CONTENT_TYPE.여행코스, "pink"],
  [CONTENT_TYPE.레포츠, "pink"],
  [CONTENT_TYPE.숙박, "orange"],
  [CONTENT_TYPE.쇼핑, "red"],
  [CONTENT_TYPE.음식점, "green"],
]);
