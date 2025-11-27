import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import {
  getPostActionText,
  getPostCategoryColor,
  getPostStatusColor,
  getPostStatusText,
} from "@/features/post/libs";
import type { Post } from "@/shared/api/postService";
import { useCallback } from "react";

export function PostTable({
  postList,
  onEdit,
  onDelete,
  onRestore,
  onPublish,
  onArchive,
}: {
  postList: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onRestore: (id: number) => void;
  onPublish: (id: number) => void;
  onArchive: (id: number) => void;
}) {
  const handleStatusAction = useCallback(
    async (id: number, status: "draft" | "published" | "archived") => {
      if (status === "draft") {
        await onPublish(id);
      } else if (status === "published") {
        await onArchive(id);
      } else if (status === "archived") {
        await onRestore(id);
      }
    },
    [onPublish, onArchive, onRestore]
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>조회수</TableHead>
          <TableHead>작성일</TableHead>
          <TableHead>관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {postList.map((post, idx) => (
          <TableRow key={post.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>
              <Badge variant={getPostCategoryColor(post.category)}>
                {post.category}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getPostStatusColor(post.status)}>
                {getPostStatusText(post.status)}
              </Badge>
            </TableCell>
            <TableCell>{post.views}</TableCell>
            <TableCell>{post.createdAt}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button size="sm" onClick={() => onEdit(post)}>
                수정
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleStatusAction(post.id, post.status)}
              >
                {getPostActionText(post.status)}
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(post.id)}
              >
                삭제
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
