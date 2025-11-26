import useTable from '@/hooks/useTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import type { Post } from '@/services/postService';

const PostDataTable = ({
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
  const { pageTableData, currentPage, setCurrentPage, totalPages } = useTable({
    tableData: data,
    pageSize: 10,
  });

  const CategoryBadge = ({
    category,
  }: {
    category: 'development' | 'design' | 'accessibility';
  }) => {
    switch (category) {
      case 'development':
        return (
          <Badge type="primary" pill>
            {category}
          </Badge>
        );
      case 'design':
        return (
          <Badge type="info" pill>
            {category}
          </Badge>
        );
      case 'accessibility':
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

  return (
    <div className="table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead className="w-[150px]">제목</TableHead>
            <TableHead className="w-[120px]">작성자</TableHead>
            <TableHead className="w-[120px]">카테고리</TableHead>
            <TableHead className="w-[120px]">상태</TableHead>
            <TableHead className="w-[120px]">생성일</TableHead>
            <TableHead className="w-[140px]">조회수</TableHead>
            <TableHead className="w-[200px]">관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageTableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>
                <CategoryBadge
                  category={row.category as 'development' | 'design' | 'accessibility'}
                />
              </TableCell>
              <TableCell>
                <Badge status={row.status} showIcon />
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.views}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
                    수정
                  </Button>
                  {row.status === 'draft' && (
                    <Button size="sm" variant="success" onClick={() => onPublish?.(row.id)}>
                      게시
                    </Button>
                  )}
                  {row.status === 'published' && (
                    <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
                      보관
                    </Button>
                  )}
                  {row.status === 'archived' && (
                    <Button size="sm" variant="primary" onClick={() => onRestore?.(row.id)}>
                      복원
                    </Button>
                  )}
                  <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
                    삭제
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagenation Button */}
      {totalPages === 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} />
            </PaginationItem>
            <PaginationItem>
              {currentPage} / {totalPages}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PostDataTable;
