import commonAxios from "@/lib/commonAxios";
import { MasterPlanProp } from "../types";

export const requestCreateMasterPlan = (
  params: MasterPlanProp
): Promise<{ planMasterId: number }> => {
  return commonAxios.post("/plan/master", params);
};
