import commonAxios from "@/lib/commonAxios";
import { MasterPlan } from "..";

export const requestGetPersonalPlan = (
  cusNo: number
): Promise<{ list: MasterPlan[]; pgno: number; totalCount: number }> => {
  return commonAxios.get("/plan/personal/" + cusNo);
};
