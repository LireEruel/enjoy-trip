import commonAxios from "@/lib/commonAxios";

export const deletePlan = (planMasterId: number): Promise<string> => {
  return commonAxios.delete("/plan/master/" + planMasterId);
};
