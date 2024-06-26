import commonAxios from "@/lib/commonAxios";
import { DetailPlanParam, MasterPlanProp } from "../types";

export const requestCreateMasterPlan = (
  params: MasterPlanProp
): Promise<{ planMasterId: number }> => {
  return commonAxios.post("/plan/master", params);
};

export const requestEditPlanDetails = (
  planMasterId: number,
  params: DetailPlanParam[]
): Promise<string> => {
  return commonAxios.put("/plan/master/" + planMasterId, params);
};
