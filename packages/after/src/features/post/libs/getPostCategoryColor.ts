export const getPostCategoryColor = (category: string) => {
  switch (category) {
    case "development":
      return "green";
    case "design":
      return "yellow";
    case "accessibility":
      return "red";
    default:
      return "gray";
  }
};
