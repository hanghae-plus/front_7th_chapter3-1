import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface TableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;

  // 🚨 도메인 관심사 추가
  entityType?: 'user' | 'post';
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
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
}: TableProps) => {
  const [tableData, setTableData] = useState<any[]>(data);
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
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === 'user') {
      if (columnKey === 'role') {
        // User role을 Badge variant로 변환 (pill 없음 - before와 동일)
        const badgeVariant =
          value === 'admin' ? 'danger' :
          value === 'moderator' ? 'warning' :
          value === 'user' ? 'primary' : 'secondary';
        const badgeText =
          value === 'admin' ? '관리자' :
          value === 'moderator' ? '운영자' :
          value === 'user' ? '사용자' : '게스트';
        return <Badge variant={badgeVariant}>{badgeText}</Badge>;
      }
      if (columnKey === 'status') {
        // User status를 Badge variant로 변환 (before와 동일하게)
        const badgeVariant =
          value === 'active' ? 'success' :
          value === 'inactive' ? 'warning' : 'danger';
        const badgeText =
          value === 'active' ? '게시됨' :
          value === 'inactive' ? '임시저장' : '거부됨';
        return <Badge variant={badgeVariant}>{badgeText}</Badge>;
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const variant =
          value === 'development' ? 'primary' :
          value === 'design' ? 'info' :
          value === 'accessibility' ? 'danger' :
          'secondary';
        return <Badge variant={variant} pill>{value}</Badge>;
      }
      if (columnKey === 'status') {
        // Post status를 Badge variant로 변환
        const badgeVariant =
          value === 'published' ? 'success' :
          value === 'draft' ? 'warning' :
          value === 'archived' ? 'secondary' :
          value === 'pending' ? 'info' : 'danger';
        const badgeText =
          value === 'published' ? '게시됨' :
          value === 'draft' ? '임시저장' :
          value === 'archived' ? '보관됨' :
          value === 'pending' ? '대기중' : '거부됨';
        return <Badge variant={badgeVariant}>{badgeText}</Badge>;
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === 'draft' && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
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
    <div className="overflow-x-auto">
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-3 border border-[#ddd] rounded-md w-[300px]"
          />
        </div>
      )}

      <table
        className={cn(
          'w-full border-collapse text-sm bg-white',
          'font-["Roboto","Helvetica","Arial",sans-serif]',
          striped && '[&_tbody_tr:nth-child(even)]:bg-[#fafafa]',
          bordered && 'border border-[rgba(0,0,0,0.12)] [&_th]:border [&_th]:border-[rgba(0,0,0,0.12)] [&_td]:border [&_td]:border-[rgba(0,0,0,0.12)]',
          hover && '[&_tbody_tr:hover]:bg-[rgba(0,0,0,0.04)]'
        )}
        style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif" }}
      >
        <thead className="bg-[#fafafa]">
          <tr>
            {actualColumns.map((column) => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className="py-4 px-4 text-left font-medium text-xs text-[rgba(0,0,0,0.6)] uppercase tracking-[0.03em] border-b-2 border-b-[rgba(0,0,0,0.12)]"
              >
                <div className={cn('flex items-center gap-1', sortable && 'cursor-pointer')}>
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={cn(
                '[&:last-child_td]:border-b-0',
                onRowClick && 'cursor-pointer'
              )}
            >
              {actualColumns.map((column) => (
                <td
                  key={column.key}
                  className="py-4 px-4 text-[rgba(0,0,0,0.87)] border-b border-b-[rgba(0,0,0,0.08)]"
                >
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              'py-1.5 px-3 border border-[#ddd] bg-white rounded-md',
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}
          >
            이전
          </button>
          <span className="py-1.5 px-3">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              'py-1.5 px-3 border border-[#ddd] bg-white rounded-md',
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
