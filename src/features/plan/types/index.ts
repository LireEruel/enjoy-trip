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

export type PlanDaily = {
  dailyPlanId: number;
  dayNo: number;
  planDate: string;
  planMasterId: number;
  dailyPlanDetailDtoList: Course[];
};

export type Course = {
  dailyPlanId: number;
  attractionId: number;
  memo: string;
  orderNo: number;
};
