import commonAxios from "@/lib/commonAxios";
import { Relation } from "..";

export const requestGetRequestRelationList = (): Promise<Relation[]> => {
  return commonAxios.get("/relation");
};

export const requestRelationApproval = (
  isApproved: boolean,
  relationId: number
) => {
  if (isApproved) {
    commonAxios.put("/relation/" + relationId);
  } else {
    commonAxios.delete("/relation/" + relationId);
  }
};
