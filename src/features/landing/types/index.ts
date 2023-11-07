export type Attraction = {
  contentId: number;
  contentTypeId: number;
  title: string;
  firstImage: string;
  addr1: string;
  addr2: string;
  isMyLove: boolean;
  isPartenerLove: boolean;
};

export type GetAttractionListProp = {
  pgno?: number;
  contentTypeId?: number[] | number;
  sidoCode?: number;
  gugunCode?: number;
  title?: string;
};

export type AttractionResult = {
  pgno: number;
  totalCount: number;
  list: Attraction[];
};
