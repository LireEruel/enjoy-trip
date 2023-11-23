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
