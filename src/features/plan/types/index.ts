import type { Dayjs } from "dayjs";

export type MasterPlanProp = {
  title: String;
  sidoCode?: number;
  gugunCode?: number;
  startDate: String | Dayjs;
  endDate: String | Dayjs;
};
