import useTable from '@/hooks/useTable';
import type { User } from '@/services/userService';
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

const UserDataTable = ({
  data,
  onEdit,
  onDelete,
}: {
  data: User[];
  onEdit?: (row: User) => void;
  onDelete?: (id: number) => void;
}) => {
  const { pageTableData, currentPage, setCurrentPage, totalPages } = useTable({
    tableData: data,
    pageSize: 10,
  });

  const StatusBadge = ({ status }: { status: 'active' | 'inactive' | 'suspended' }) => {
    switch (status) {
      case 'active':
        return <Badge status="published" showIcon />;
      case 'inactive':
        return <Badge status="draft" showIcon />;
      default:
        return <Badge status="rejected" showIcon />;
    }
  };

  return (
    <div className="table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead className="w-[150px]">사용자명</TableHead>
            <TableHead className="w-[120px]">이메일</TableHead>
            <TableHead className="w-[120px]">역할</TableHead>
            <TableHead className="w-[120px]">상태</TableHead>
            <TableHead className="w-[120px]">생성일</TableHead>
            <TableHead className="w-[140px]">마지막 로그인</TableHead>
            <TableHead className="w-[200px]">관리</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageTableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge userRole={row.role} showIcon />
              </TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.lastLogin}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
                    수정
                  </Button>
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

export default UserDataTable;
