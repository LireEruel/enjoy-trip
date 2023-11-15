import commonAxios from "@/lib/commonAxios";
import { AttractionResult } from "..";

export const requestAttractionCommentList = (
  commentPageSize: number,
  commentPageNum: number,
  contentId: number
): Promise<AttractionResult> => {
  return commonAxios.post("/attraction/" + contentId, {
    pgno: commentPageNum,
    pageSize: commentPageSize,
  });
};
