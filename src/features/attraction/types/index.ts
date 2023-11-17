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

export type AttractionDetail = {
  contentId: number;
  contentTypeId: number;
  title: string;
  firstImage: string;
  addr1: string;
  addr2: string;
  isMyLove: boolean;
  isPartenerLove: boolean;
  description: string;
  latitude: number;
  longitude: number;
  tel: string;
  mlevel: number;
};

export type GetAttractionListProp = {
  pgno?: number;
  sidoCode?: number;
  gugunCode?: number;
  pageSize?: number;
  contentTypeId?: (number | null)[];
  title?: String;
};

export type AttractionResult = {
  pgno: number;
  totalCount: number;
  list: Attraction[];
};

export type AttractionReviewResult = {
  pgno: number;
  totalCount: number;
  list: AttractionReview[];
};

export type AttractionReview = {
  attractionId: number;
  content: string;
  hit: number;
  orderNo: number;
  rating: number; // 별점
  registerTime: string;
  reviewId: number;
  reviewMasterId: number;
  title: string;
  viewYn: string;
  visitedDate: string;
  writerName: string;
};
