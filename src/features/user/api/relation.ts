import commonAxios from "@/lib/commonAxios";
import { Relation } from "..";

export const requestGetRequestRelationList = (): Promise<Relation> => {
  return commonAxios.get("/relation");
};
