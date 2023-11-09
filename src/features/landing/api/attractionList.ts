import commonAxios from "@/lib/commonAxios";
import { AttractionResult, GetAttractionListProp } from "..";

export const requestAttractionList = (
  params: GetAttractionListProp
): Promise<AttractionResult> => {
  return commonAxios.post("/attraction", params);
};
