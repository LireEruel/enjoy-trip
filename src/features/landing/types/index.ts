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
  contentTypeId?: number[] | number;
  sidoCode?: number;
  gugunCode?: number;
  title?: String;
};

export type AttractionResult = {
  pgno: number;
  totalCount: number;
  list: Attraction[];
};
