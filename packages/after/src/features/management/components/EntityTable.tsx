import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination-controls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";
import type { Entity, EntityType, StatusAction } from "../types";
import { StatusBadge, type StatusBadgeTone } from "./StatusBadge";
import { Input } from "@/components/ui/input";

interface EntityTableProps {
  entityType: EntityType;
  data: Entity[];
  onEdit: (entity: Entity) => void;
  onDelete: (id: number) => void;
  onStatusAction?: (id: number, action: StatusAction) => void;
  onOpenCreateDialog: () => void;
}

const userColumns = [
  { key: "id", label: "ID" },
  { key: "username", label: "사용자명" },
  { key: "email", label: "이메일" },
  { key: "role", label: "역할" },
  { key: "status", label: "상태" },
  { key: "createdAt", label: "생성일" },
  { key: "lastLogin", label: "마지막 로그인" },
  { key: "actions", label: "관리" },
] as const;

const postColumns = [
  { key: "id", label: "ID" },
  { key: "title", label: "제목" },
  { key: "author", label: "작성자" },
  { key: "category", label: "카테고리" },
  { key: "status", label: "상태" },
  { key: "views", label: "조회수" },
  { key: "createdAt", label: "작성일" },
  { key: "actions", label: "관리" },
] as const;

const badgeToneMap: Record<string, { tone: StatusBadgeTone; label: string }> = {
  active: { tone: "success", label: "활성" },
  inactive: { tone: "warning", label: "비활성" },
  suspended: { tone: "danger", label: "정지" },
  admin: { tone: "danger", label: "관리자" },
  moderator: { tone: "warning", label: "운영자" },
  user: { tone: "primary", label: "사용자" },
  draft: { tone: "warning", label: "임시저장" },
  published: { tone: "success", label: "게시됨" },
  archived: { tone: "neutral", label: "보관됨" },
  development: { tone: "primary", label: "Development" },
  design: { tone: "warning", label: "Design" },
  accessibility: { tone: "danger", label: "Accessibility" },
};

const formatNumber = (value: number | undefined) =>
  new Intl.NumberFormat("ko-KR").format(value ?? 0);

const PAGE_SIZE = 10;

export const EntityTable = ({
  entityType,
  data,
  onEdit,
  onDelete,
  onStatusAction,
  onOpenCreateDialog,
}: EntityTableProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(lower),
      ),
    );
  }, [search, data]);

  useEffect(() => {
    setPage(1);
  }, [search, data, entityType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const columns = entityType === "user" ? userColumns : postColumns;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Input
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-xs"
          />
          <p className="whitespace-nowrap text-sm text-muted-foreground">
            총 {filtered.length.toLocaleString()}건
          </p>
        </div>
        <Button variant="primary" onClick={onOpenCreateDialog}>
          새로 만들기
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  표시할 데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell({
                        entityType,
                        row,
                        column: column.key,
                        onEdit,
                        onDelete,
                        onStatusAction,
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        disabledNext={filtered.length === 0 || page === totalPages}
      />
    </div>
  );
};

type RenderCellProps = {
  entityType: EntityType;
  row: Entity;
  column: string;
  onEdit: (entity: Entity) => void;
  onDelete: (id: number) => void;
  onStatusAction?: (id: number, action: StatusAction) => void;
};

const renderCell = ({
  entityType,
  row,
  column,
  onEdit,
  onDelete,
  onStatusAction,
}: RenderCellProps) => {
  if (column === "actions") {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => onEdit(row)}
        >
          수정
        </Button>
        {entityType === "post" &&
          renderPostActions(row as Post, onStatusAction)}
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={() => onDelete(row.id)}
        >
          삭제
        </Button>
      </div>
    );
  }

  if (entityType === "user") {
    const user = row as User;
    switch (column) {
      case "role":
        return <StatusBadge {...badgeToneMap[user.role]} />;
      case "status":
        return <StatusBadge {...badgeToneMap[user.status]} />;
      case "lastLogin":
        return user.lastLogin ?? "-";
      default:
        return user[column as keyof User];
    }
  }

  const post = row as Post;
  switch (column) {
    case "category":
      return <StatusBadge {...badgeToneMap[post.category]} />;
    case "status":
      return <StatusBadge {...badgeToneMap[post.status]} />;
    case "views":
      return formatNumber(post.views);
    default:
      return post[column as keyof Post];
  }
};

const renderPostActions = (
  row: Post,
  onStatusAction?: (id: number, action: StatusAction) => void,
) => (
  <>
    {row.status === "draft" && (
      <Button
        type="button"
        size="sm"
        variant="success"
        onClick={() => onStatusAction?.(row.id, "publish")}
      >
        게시
      </Button>
    )}
    {row.status === "published" && (
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onStatusAction?.(row.id, "archive")}
      >
        보관
      </Button>
    )}
    {row.status === "archived" && (
      <Button
        type="button"
        size="sm"
        variant="primary"
        onClick={() => onStatusAction?.(row.id, "restore")}
      >
        복원
      </Button>
    )}
  </>
);

