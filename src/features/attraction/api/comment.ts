import commonAxios from "@/lib/commonAxios";
import fileAxios from "@/lib/fileAxios";

export const requestAttractionComment = (
  attractionId: number,
  title: String,
  content: String,
  rating: number
) => {
  fileAxios.post("/board/review", {
    attractionId: attractionId,
    title: title,
    content: content,
    rating: rating,
  });
};
export const requestDeleteAttractionComment = (reviewId: number) => {
  commonAxios.delete("/board/review/" + reviewId);
};
