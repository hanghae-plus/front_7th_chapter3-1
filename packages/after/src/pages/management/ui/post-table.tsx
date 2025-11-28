import React, { useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { type Post, POST_STATUSES_MAP } from '@/entities/post';
import { cn } from '@/shared/lib/utils';
import { POST_CATEGORY_BADGE_MAP, POST_STATUS_BADGE_MAP } from '../config/constants.config';

interface TableProps {
  posts: Post[];
  pageSize?: number;
  onEdit: (item: Post) => void;
  onDelete: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

const POST_TABLE_COLUMNS = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '제목', width: '200px' },
  { key: 'author', header: '작성자', width: '120px' },
  { key: 'category', header: '카테고리', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'views', header: '조회수', width: '100px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'actions', header: '관리', width: '240px' },
];

export const PostManagementTable: React.FC<TableProps> = ({
  posts = [],
  pageSize = 10,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(posts.length / pageSize);

  const renderActionButtons = (row: Post) => {
    switch (row.status) {
      case POST_STATUSES_MAP.draft:
        return (
          <>
            <Button size="sm" variant="primary" onClick={() => onPublish?.(row.id)}>
              게시
            </Button>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </>
        );
      case POST_STATUSES_MAP.published:
        return (
          <>
            <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
              보관
            </Button>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </>
        );
      case POST_STATUSES_MAP.archived:
        return (
          <>
            <Button size="sm" variant="success" onClick={() => onRestore?.(row.id)}>
              복원
            </Button>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {POST_TABLE_COLUMNS.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => {
            const postStatus =
              POST_STATUS_BADGE_MAP[row.status as keyof typeof POST_STATUS_BADGE_MAP];
            const postCategory =
              POST_CATEGORY_BADGE_MAP[row.category as keyof typeof POST_CATEGORY_BADGE_MAP];
            return (
              <TableRow key={rowIndex}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>
                  <Badge variant={postCategory.variant}>{postCategory.content}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={postStatus.variant}>{postStatus.content}</Badge>
                </TableCell>
                <TableCell>{row.views}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <div className="gap-xs flex">{renderActionButtons(row)}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="mt-[16px] flex justify-center gap-[8px]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              'bg-background border-border text-foreground px-pxr-12 py-pxr-6 cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-60',
              currentPage === 1 && 'cursor-not-allowed opacity-60'
            )}
          >
            이전
          </button>
          <span className="px-[12px] py-[6px]">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              'bg-background border-border text-foreground px-pxr-12 py-pxr-6 cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:opacity-60',
              currentPage === totalPages && 'cursor-not-allowed opacity-60'
            )}
          >
            다음
          </button>
        </div>
      )}
    </>
  );
};
