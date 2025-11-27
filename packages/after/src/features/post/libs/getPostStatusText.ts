export const getPostStatusText = (
  status: "published" | "draft" | "archived"
) => {
  switch (status) {
    case "published":
      return "게시됨";
    case "draft":
      return "임시저장";
    case "archived":
      return "보관됨";
    default:
      return status;
  }
};
