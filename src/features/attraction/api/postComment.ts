import commonAxios from "@/lib/commonAxios";

export const requestAttractionComment = (
  attractionId: number,
  title: String,
  content: String,
  rating: number
) => {
  commonAxios.post("/board/review", {
    attractionId: attractionId,
    title: title,
    content: content,
    rating: rating,
  });
};
