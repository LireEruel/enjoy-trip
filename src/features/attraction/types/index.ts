export type Attraction = {
  contentId: number;
  contentTypeId: number;
  title: string;
  firstImage: string;
  addr1: string;
  addr2: string;
  isMyLove: boolean;
  isPartenerLove: boolean;
  description?: string;
};

export type GetAttractionListProp = {
  pgno?: number;
  sidoCode?: number;
  gugunCode?: number;
  pageSize?: number;
};

export type AttractionResult = {
  pgno: number;
  totalCount: number;
  list: Attraction[];
};
