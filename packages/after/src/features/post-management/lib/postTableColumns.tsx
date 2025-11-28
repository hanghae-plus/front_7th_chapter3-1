import type { Column } from "../../../shared/ui/Table";
import { Badge } from "../../../shared/ui/Badge";
import { Button } from "../../../shared/ui/Button";
import type { Post } from "../types/post.types";
import { getStatusConfig } from "./postBadgeConfig";

interface PostTableActions {
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case "development":
      return { variant: "primary" as const };
    case "design":
      return { variant: "info" as const };
    case "accessibility":
      return { variant: "danger" as const };
    default:
      return { variant: "secondary" as const };
  }
};

export const createPostTableColumns = (actions: PostTableActions): Column<Post>[] => [
  { key: "id", header: "ID", width: "60px" },
  { key: "title", header: "제목" },
  { key: "author", header: "작성자", width: "120px" },
  {
    key: "category",
    header: "카테고리",
    width: "140px",
    render: (value: unknown) => {
      const categoryConfig = getCategoryConfig(value as string);
      return (
        <Badge variant={categoryConfig.variant} pill>
          {String(value)}
        </Badge>
      );
    },
  },
  {
    key: "status",
    header: "상태",
    width: "120px",
    render: (value: unknown) => {
      const statusConfig = getStatusConfig(value as Post["status"]);
      return statusConfig ? <Badge variant={statusConfig.variant}>{statusConfig.text}</Badge> : String(value);
    },
  },
  {
    key: "views",
    header: "조회수",
    width: "100px",
    render: (value: unknown) => (value as number)?.toLocaleString() || "0",
  },
  { key: "createdAt", header: "작성일", width: "120px" },
  {
    key: "actions",
    header: "관리",
    width: "250px",
    sortable: false,
    render: (_value: unknown, post: Post) => (
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="primary" onClick={() => actions.onEdit(post)}>
          수정
        </Button>
        {post.status === "draft" && (
          <Button size="sm" variant="success" onClick={() => actions.onPublish(post.id)}>
            게시
          </Button>
        )}
        {post.status === "published" && (
          <Button size="sm" variant="secondary" onClick={() => actions.onArchive(post.id)}>
            보관
          </Button>
        )}
        {post.status === "archived" && (
          <Button size="sm" variant="primary" onClick={() => actions.onRestore(post.id)}>
            복원
          </Button>
        )}
        <Button size="sm" variant="danger" onClick={() => actions.onDelete(post.id)}>
          삭제
        </Button>
      </div>
    ),
  },
];
