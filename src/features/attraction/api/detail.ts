import commonAxios from "@/lib/commonAxios";
import { AttractionDetail } from "..";

export const requestGetAttractionDetail = (
  contentId: number
): Promise<AttractionDetail> => {
  return commonAxios.get("/attraction/" + contentId);
};
