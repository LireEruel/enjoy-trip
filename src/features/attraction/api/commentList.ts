import commonAxios from "@/lib/commonAxios";
import { AttractionReviewResult } from "..";

export const requestAttractionReviewList = (
  reviewPageSize: number,
  reviewPageNum: number,
  contentId: number
): Promise<AttractionReviewResult> => {
  return commonAxios.get("/board/review/" + contentId, {
    params: {
      pgno: reviewPageNum,
      pageSize: reviewPageSize,
    },
  });
};
