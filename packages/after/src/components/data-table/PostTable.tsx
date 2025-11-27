import Table from "../ui/Table";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

import type { Post } from "@/services/postService";

const PostTable = ({
  data,
  onEdit,
  onArchive,
  onDelete,
  onPublish,
  onRestore,
}: {
  data: Post[];
  onEdit?: (row: Post) => void;
  onArchive?: (id: number) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onRestore?: (id: number) => void;
}) => {
  const CategoryBadge = ({
    category,
  }: {
    category: "development" | "design" | "accessibility";
  }) => {
    switch (category) {
      case "development":
        return (
          <Badge type="primary" pill>
            {category}
          </Badge>
        );
      case "design":
        return (
          <Badge type="info" pill>
            {category}
          </Badge>
        );
      case "accessibility":
        return (
          <Badge type="danger" pill>
            {category}
          </Badge>
        );
      default:
        return (
          <Badge type="secondary" pill>
            {category}
          </Badge>
        );
    }
  };

  const columns = [
    { key: "id", header: "ID", width: "60px" },
    { key: "title", header: "제목" },
    { key: "author", header: "작성자", width: "120px" },
    {
      key: "category",
      header: "카테고리",
      width: "140px",
      render: (row: Post) => (
        <CategoryBadge
          category={row.category as "development" | "design" | "accessibility"}
        />
      ),
    },
    {
      key: "status",
      header: "상태",
      width: "120px",
      render: (row: Post) => (
        <Badge
          status={row.status as "draft" | "published" | "archived"}
          showIcon
        />
      ),
    },
    { key: "views", header: "조회수", width: "100px" },
    { key: "createdAt", header: "작성일", width: "120px" },
    {
      key: "actions",
      header: "관리",
      width: "250px",
      render: (row: Post) => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
            수정
          </Button>
          {row.status === "draft" && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onPublish?.(row.id)}
            >
              게시
            </Button>
          )}
          {row.status === "published" && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onArchive?.(row.id)}
            >
              보관
            </Button>
          )}
          {row.status === "archived" && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onRestore?.(row.id)}
            >
              복원
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return <Table tableData={data} columns={columns} pageSize={10} />;
};

export default PostTable;
