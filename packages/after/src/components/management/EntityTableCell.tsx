import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";
import type { EntityType } from "@/type/management";
import { Button } from "../ui/button";
import {
  CATEGORY_OPTIONS,
  ROLE_BADGE_VARIANT,
  STATUS_BADGE_VARIANT,
} from "@/constants/management";
import { Badge } from "../ui/badge";

export const EntityTableCell = ({
  columnKey,
  item,
  entityType,
  onEdit,
  onDelete,
  onStatusAction,
}: {
  columnKey: string;
  item: User | Post;
  entityType: EntityType;
  onEdit: (item: User | Post) => void;
  onDelete: (id: number) => void;
  onStatusAction?: (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => void;
}) => {
  if (columnKey === "actions") {
    const buttons: React.ReactNode[] = [
      <Button
        key="edit"
        size="sm"
        variant="primary"
        onClick={() => onEdit(item)}
      >
        수정
      </Button>,
    ];

    if (entityType === "post" && onStatusAction) {
      const status = (item as Post).status;
      const statusInfo = STATUS_BADGE_VARIANT[status];
      // Button variant는 muted를 지원하지 않으므로 secondary로 매핑
      const buttonVariant =
        statusInfo.variant === "muted"
          ? "secondary"
          : (statusInfo.variant as "success" | "danger" | "warning" | "info");

      if (status === "archived") {
        buttons.push(
          <Button
            key="restore"
            size="sm"
            variant={buttonVariant}
            onClick={() => onStatusAction(item.id, "restore")}
          >
            복원
          </Button>
        );
      } else if (status === "draft") {
        buttons.push(
          <Button
            key="publish"
            size="sm"
            variant={buttonVariant}
            onClick={() => onStatusAction(item.id, "publish")}
          >
            게시
          </Button>
        );
      }

      if (status === "published") {
        buttons.push(
          <Button
            key="archive"
            size="sm"
            variant={buttonVariant}
            onClick={() => onStatusAction(item.id, "archive")}
          >
            보관
          </Button>
        );
      }
    }

    buttons.push(
      <Button
        key="delete"
        size="sm"
        variant="danger"
        onClick={() => onDelete(item.id)}
      >
        삭제
      </Button>
    );

    return <div className="flex flex-wrap gap-2 justify-center">{buttons}</div>;
  }

  if (columnKey === "status") {
    const status = (item as User | Post)
      .status as keyof typeof STATUS_BADGE_VARIANT;
    const statusInfo = STATUS_BADGE_VARIANT[status] ?? {
      variant: "muted",
      label: status,
    };

    if (entityType === "user") {
      const isActive = status === "active";
      return (
        <Badge variant={isActive ? "success" : "muted"} radius="lg">
          {isActive ? "게시됨" : "보관됨"}
        </Badge>
      );
    }

    return (
      <Badge variant={statusInfo.variant} radius="lg">
        {statusInfo.label}
      </Badge>
    );
  }

  if (columnKey === "role") {
    const role = (item as User).role as keyof typeof ROLE_BADGE_VARIANT;
    const roleInfo = ROLE_BADGE_VARIANT[role] ?? {
      variant: "muted" as const,
      label: "사용자",
    };
    return <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>;
  }

  if (columnKey === "category" && entityType === "post") {
    const category = (item as Post).category;
    if (!category) {
      return "-";
    }
    return (
      <Badge variant="info">
        {CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
          category}
      </Badge>
    );
  }

  const value = (
    item as unknown as Record<string, string | number | undefined>
  )[columnKey];

  return value ?? "-";
};
