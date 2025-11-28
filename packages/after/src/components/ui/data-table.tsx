import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

/**
 * 테이블 행 데이터의 기본 타입
 * @description 객체 타입을 허용하여 다양한 엔티티와 호환
 */
interface DataTableProps<T extends object = Record<string, unknown>> {
  columns?: Column[];
  data?: T[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: T) => void;
  renderCell?: (row: T, columnKey: string) => React.ReactNode;
}

export const DataTable = <T extends object>({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  renderCell,
}: DataTableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>(data);
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
      const aVal = (a as Record<string, unknown>)[columnKey];
      const bVal = (b as Record<string, unknown>)[columnKey];

      // 숫자 비교
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // 문자열 비교 (null/undefined 안전 처리)
      const aStr = aVal != null ? String(aVal) : '';
      const bStr = bVal != null ? String(bVal) : '';
      
      return newDirection === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    setTableData(sorted);
  };

  const filteredData = searchable && searchTerm
    ? tableData.filter(row =>
        Object.values(row as Record<string, unknown>).some(val =>
          val != null && String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns = columns || (tableData[0] ? Object.keys(tableData[0] as Record<string, unknown>).map(key => ({ key, header: key, width: undefined })) : []);

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-border rounded w-[300px]"
          />
        </div>
      )}

      <Table className={cn(
        striped && "[&_tbody_tr:nth-child(even)]:bg-muted/50",
        bordered && "border",
        hover && "[&_tbody_tr:hover]:bg-accent"
      )}>
        <TableHeader>
          <TableRow>
            {actualColumns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={cn(sortable && "cursor-pointer")}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={cn(onRowClick && "cursor-pointer")}
            >
              {actualColumns.map((column) => (
                <TableCell key={column.key}>
                  {/* ✅ Render Props: 외부에서 주입된 렌더링 함수 사용 */}
                  {renderCell ? renderCell(row, column.key) : String((row as Record<string, unknown>)[column.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <span className="px-3 py-1.5">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};

