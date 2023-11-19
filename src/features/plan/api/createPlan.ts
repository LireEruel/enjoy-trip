import commonAxios from "@/lib/commonAxios";
import { MasterPlan, MasterPlanProp } from "../types";

export const requestCreateMasterPlan = (
  params: MasterPlanProp
): Promise<{ planMasterId: number }> => {
  return commonAxios.post("/plan/master", params);
};

export const requestGetMasterPlan = async (
  planMasterId: number
): Promise<MasterPlan> => {
  const res: any = await commonAxios.get("/plan/master/" + planMasterId);
  return res[0];
};
