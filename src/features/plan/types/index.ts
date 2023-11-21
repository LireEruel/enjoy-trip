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
