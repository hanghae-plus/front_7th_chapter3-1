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
import { getPostStatusText } from "@/features/post/libs";
import type { Post } from "@/shared/api/postService";

export function PostTable({
  postList,
  onEdit,
  onDelete,
}: {
  postList: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}) {
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
              <Badge>{post.category}</Badge>
            </TableCell>
            <TableCell>
              <Badge>{getPostStatusText(post.status)}</Badge>
            </TableCell>
            <TableCell>{post.views}</TableCell>
            <TableCell>{post.createdAt}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button size="sm" onClick={() => onEdit(post)}>
                수정
              </Button>
              <Button size="sm" onClick={() => onDelete(post.id)}>
                삭제
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
