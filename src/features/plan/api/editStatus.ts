import commonAxios from "@/lib/commonAxios";

export const requestEditPlanStatus = (
  planMasterId: number,
  viewYn: string,
  shareYn: string
) => {
  return commonAxios.put("/plan/master/status", {
    planMasterId: planMasterId,
    viewYn: viewYn,
    shareYn: shareYn,
  });
};
