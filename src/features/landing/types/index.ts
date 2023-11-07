export type Attraction = {
  contentId: number;
  contentTypeId: number;
  title: String;
  first_image: String;
  addr1: String;
  add2: String;
  isMyLove: boolean;
  isPartenerLove: boolean;
};

export type GetAttractionListProp = {
  pgno?: number;
  contentTypeId?: number[];
  sidoCode?: number;
  gugunCode?: number;
  title?: String;
};

export type AttractionResult = {
  pgno: number;
  totalCount: number;
  list: Attraction[];
};

export enum CONTENT_TYPE {
  관광지 = 12,
  문화시설 = 14,
  축제공연행사 = 15,
  여행코스 = 25,
  레포츠 = 28,
  숙박 = 32,
  쇼핑 = 38,
  음식점 = 39,
}
