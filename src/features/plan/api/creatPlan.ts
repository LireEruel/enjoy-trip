import commonAxios from "@/lib/commonAxios";
import { MasterPlanProp, MasterPlanDailyInitialData } from "../types";

export const requestCreateMasterPlan = (
  params: MasterPlanProp
): Promise<{ planMasterId: number }> => {
  return commonAxios.post("/plan/master", params);
};

export const requestGetMasterPlan = (
  planMasterId: number
): Promise<Array<MasterPlanDailyInitialData>> => {
  return commonAxios.get("/plan/master/" + planMasterId);
};
