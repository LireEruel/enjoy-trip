import commonAxios from "@/lib/commonAxios";
import { RequestLikeParams } from "..";

export const toggleLike = (param: RequestLikeParams) => {
  commonAxios.post("/content/like", param);
};
