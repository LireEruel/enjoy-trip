import commonAxios from "@/lib/commonAxios";
import { EditReviewParam } from "..";

export const requestEditReview = (
  planMasterId: number,
  params: EditReviewParam[]
) => {
  return commonAxios.put("/plan/master/review/" + planMasterId, params);
};
