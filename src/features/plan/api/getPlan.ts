import commonAxios from "@/lib/commonAxios";
import { MasterPlan } from "..";

export const requestGetPersonalPlan = (
  cusNo: number,
  isReview: boolean
): Promise<{
  list: MasterPlan[];
  pgno: number;
  totalCount: number;
  isReview: boolean;
}> => {
  return commonAxios.get("/plan/personal/" + cusNo, {
    params: {
      isReview: isReview,
    },
  });
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
