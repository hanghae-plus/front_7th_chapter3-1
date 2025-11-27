export const getPostActionText = (
  status: "draft" | "published" | "archived"
) => {
  switch (status) {
    case "draft":
      return "게시";
    case "published":
      return "보관";
    case "archived":
      return "복원";
    default:
      return status;
  }
};
