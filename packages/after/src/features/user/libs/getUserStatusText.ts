export const getUserStatusText = (
  status: "active" | "inactive" | "suspended"
) => {
  switch (status) {
    case "active":
      return "활성";
    case "inactive":
      return "비활성";
    case "suspended":
      return "정지";
  }
};
