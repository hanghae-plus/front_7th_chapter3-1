import React, { useState, useEffect } from 'react';
import {
  Table as UiTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from './ui/table.tsx';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Badge } from './atoms';
// import type { TableProps } from './organisms/Table.tsx';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface TableProps {
  columns?: Column[];
  data?: unknown[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: unknown) => void;

  entityType?: 'user' | 'post';
  onEdit?: (item: unknown) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const DataTable: React.FC<TableProps> = ({
  columns,
  data = [],
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<unknown[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return newDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData = searchable && searchTerm
    ? tableData.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns = columns || (tableData[0] ? Object.keys(tableData[0]).map(key => ({ key, header: key, width: undefined })) : []);

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (row: unknown, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === 'user') {
      if (columnKey === 'role') {
        return <Badge userRole={value} showIcon />;
      }
      if (columnKey === 'status') {
        // User status를 Badge status로 변환
        const badgeStatus =
          value === 'active' ? 'published' :
          value === 'inactive' ? 'draft' : 'rejected';
        return <Badge status={badgeStatus} showIcon />;
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)} type="button">
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)} type="button">
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const type =
          value === 'development' ? 'primary' :
          value === 'design' ? 'info' :
          value === 'accessibility' ? 'danger' :
          'secondary';
        return <Badge type={type} pill>{value}</Badge>;
      }
      if (columnKey === 'status') {
        return <Badge status={value} showIcon />;
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)} type="button">
              수정
            </Button>
            {row.status === 'draft' && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(row.id)}
                type="button"
              >
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
                type="button"
              >
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onRestore?.(row.id)}
                type="button"
              >
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)} type="button">
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="table-container">
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
      )}

      <div className="border rounded-md">
        <UiTable>
          <TableHeader>
            <TableRow>
              {actualColumns.map((column) => (
                <TableHead
                  key={column.key}
                  style={column.width ? { width: column.width } : {}}
                  onClick={() => handleSort(column.key)}
                  className={sortable ? 'cursor-pointer' : ''}
                >
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'cursor-pointer' : ''}
              >
                {actualColumns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCell(row, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </UiTable>
      </div>


      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            이전
          </Button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
