import commonAxios from "@/lib/commonAxios";
import { MasterPlan } from "..";

export const requestGetPersonalPlan = (
  cusNo: number
): Promise<{ list: MasterPlan[]; pgno: number; totalCount: number }> => {
  return commonAxios.get("/plan/personal/" + cusNo);
};

export const requestGetMasterPlan = (
  planMasterId: number,
  isReview: boolean | undefined
): Promise<MasterPlan> => {
  return commonAxios.get("/plan/master/" + planMasterId, {
    params: {
      isReview: isReview,
    },
  });
};
