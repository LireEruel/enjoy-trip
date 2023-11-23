import { Attraction } from "@/features/attraction";
import type { Dayjs } from "dayjs";

export type MasterPlanProp = {
  title: string;
  sidoCode?: number;
  gugunCode?: number;
  startDate: string | Dayjs;
  endDate: string | Dayjs;
};

export type PlanBase = {
  planMasterId: number;
  sidoName?: string;
  gugunName?: string;
} & MasterPlanProp;

export type DailyPlan = {
  dailyPlanId: number;
  dayNo: number;
  planDate: string;
  planMasterId: number;
  dailyPlanDetailDtoList: Course[];
};

export type Course = {
  dailyPlanDetailId?: number;
  dailyPlanId: number;
  attractionId: number;
  attractionDto: Attraction;
  reviewId?: number;
  memo: string;
  reviewContent: string;
  orderNo?: number;
  fileIdList: number[];
  fileList: FileInfo[];
};

export type FileInfo = {
  boardId: number;
  boardType: string;
  fileId: number;
  filepath: string;
  orderNo: number;
  originFileName: string;
  tempFileName: string;
};

export type MasterPlan = {
  dailyPlanDtoList: DailyPlan[];
  planMasterId: number;
  registerTime: string;
  shareYn: string; // Y or N
  writerName: string;
  writerNo: number;
} & MasterPlanProp;

export type DetailPlanParam = {
  dailyPlanId: number;
  attractionId: number;
  memo: string;
  orderNo: number;
};

export type EditReviewParam = {
  dailyPlanId: number;
  reviewContent: string;
  dailyPlanDetailId: number;
  fileIdList: number[];
};

export type ReviewPageInfo = {
  dayNo: number;
  reviewContent: string;
  attractionId: number;
  attractionTypeId: number;
  attractionTitle: string;
  imgUrl: string;
};

export type PlanReviewDetailInfo = {
  planMasterId: number;
  writerNo: number;
  writerName: string;
  title: string;
  sidoCode: number;
  gugunCode: number;
  startDate: string;
  endDate: string;
  registerTime: string;
  shareYn: string;
  reviewList: ReviewPageInfo[];
};
