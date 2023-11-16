import type { Dayjs } from "dayjs";

export type InitialPlanProp = {
  title: String;
  sidoCode?: number;
  gugunCode?: number;
  startDate: String | Dayjs;
  endDate: String | Dayjs;
};
