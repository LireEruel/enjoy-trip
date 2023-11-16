import type { Dayjs } from "dayjs";

export type MasterPlanProp = {
  title: String;
  sidoCode?: number;
  gugunCode?: number;
  startDate: String | Dayjs;
  endDate: String | Dayjs;
};

export type PlanBase = {
  planMasterId: number;
} & MasterPlanProp;

export type PlanDaily = {
  dailyPlanId: number;
  dayNo: number;
  planDate: String;
  planMasterId: number;
  dailyPlanDetailDtoList: Course[];
};

export type Course = {
  dailyPlanId: number;
  attractionId: number;
  memo: String;
  orderNo: number;
};
