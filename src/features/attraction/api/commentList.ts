import commonAxios from "@/lib/commonAxios";
import { AttractionReviewResult } from "..";

export const requestAttractionCommentList = (
  commentPageSize: number,
  commentPageNum: number,
  contentId: number
): Promise<AttractionReviewResult> => {
  return commonAxios.get("/board/review/" + contentId, {
    params: {
      pgno: commentPageNum,
      pageSize: commentPageSize,
    },
  });
};
