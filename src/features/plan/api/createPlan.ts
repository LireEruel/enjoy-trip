import commonAxios from "@/lib/commonAxios";
import { DetailPlanParam, MasterPlan, MasterPlanProp } from "../types";

export const requestCreateMasterPlan = (
  params: MasterPlanProp
): Promise<{ planMasterId: number }> => {
  return commonAxios.post("/plan/master", params);
};

export const requestGetMasterPlan = (
  planMasterId: number
): Promise<MasterPlan> => {
  return commonAxios.get("/plan/master/" + planMasterId);
};

export const requestEditPlanDetails = (
  planMasterId: number,
  params: DetailPlanParam[]
) => {
  return commonAxios.post("/plan/detail/" + planMasterId, params);
};
