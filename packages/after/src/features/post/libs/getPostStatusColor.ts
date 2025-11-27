export const getPostStatusColor = (
  status: "draft" | "published" | "archived"
) => {
  switch (status) {
    case "draft":
      return "yellow";
    case "published":
      return "green";
    case "archived":
      return "red";
    default:
      return "gray";
  }
};
