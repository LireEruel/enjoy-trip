export type Attraction = {
  contentId: number;
  contentTypeId: number;
  title: string;
  firstImage: string;
  addr1: string;
  addr2: string;
  isMyLike: boolean;
  isPartenerLike: boolean;
};

export type GetAttractionListProp = {
  pgno?: number;
  sidoCode?: number;
  gugunCode?: number;
};

export type AttractionResult = {
  pgno: number;
  totalCount: number;
  list: Attraction[];
};
