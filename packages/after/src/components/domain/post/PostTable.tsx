import DataTable from "../../composed/DataTable";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

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
  const categoryType = {
    development: { type: "primary", label: "" },
    design: { type: "info", label: "" },
    accessibility: { type: "danger", label: "" },
  } as const;

  const statusType = {
    draft: { type: "warning", label: "임시저장" },
    published: { type: "success", label: "게시됨" },
    archived: { type: "secondary", label: "보관됨" },
  } as const;

  const columns = [
    { key: "id", header: "ID", width: "60px" },
    { key: "title", header: "제목" },
    { key: "author", header: "작성자", width: "120px" },
    {
      key: "category",
      header: "카테고리",
      width: "140px",
      render: ({ category }: { category: "development" | "design" | "accessibility" }) => (
        <Badge type={categoryType[category]?.type} pill>
          {category}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "상태",
      width: "120px",
      render: ({ status }: { status: "draft" | "published" | "archived" }) => (
        <Badge type={statusType[status]?.type}>{statusType[status]?.label}</Badge>
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
            <Button size="sm" variant="success" onClick={() => onPublish?.(row.id)}>
              게시
            </Button>
          )}
          {row.status === "published" && (
            <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
              보관
            </Button>
          )}
          {row.status === "archived" && (
            <Button size="sm" variant="primary" onClick={() => onRestore?.(row.id)}>
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

  return <DataTable tableData={data} columns={columns} pageSize={10} />;
};

export default PostTable;
