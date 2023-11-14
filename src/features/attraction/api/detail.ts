import commonAxios from "@/lib/commonAxios";
import { Attraction } from "..";

export const requestGetAttractionDetail = (
  contentId: number
): Promise<Attraction> => {
  return commonAxios.get("/attraction/" + contentId);
};
