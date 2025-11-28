import { useState, useEffect, useMemo } from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';
import type { DataTableProps } from './types';

export function DataTable<T extends Record<string, any> = Record<string, any>>({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = true,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  className,
}: DataTableProps<T>) {
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

    const newDirection =
      sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
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

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return tableData;

    return tableData.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchable, searchTerm, tableData]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Input */}
      {searchable && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="px-3 py-2 border border-(--color-border-base) rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary) w-80"
          />
        </div>
      )}

      {/* Table */}
      <div
        className={cn(
          bordered &&
            'border border-(--color-border-base) rounded-lg overflow-hidden'
        )}
      >
        <Table>
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.Head
                  key={column.key}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() =>
                    sortable &&
                    column.sortable !== false &&
                    handleSort(column.key)
                  }
                  className={cn(
                    sortable &&
                      column.sortable !== false &&
                      'cursor-pointer select-none hover:bg-(--color-bg-hover)'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {sortable &&
                      column.sortable !== false &&
                      sortColumn === column.key && (
                        <span className="text-xs">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                  </div>
                </Table.Head>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedData.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className="text-center py-8 text-(--color-text-secondary)"
                >
                  데이터가 없습니다.
                </Table.Cell>
              </Table.Row>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <Table.Row
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    onRowClick && 'cursor-pointer',
                    hover && 'hover:bg-(--color-bg-hover)',
                    striped && rowIndex % 2 === 1 && 'bg-(--color-bg-secondary)'
                  )}
                >
                  {columns.map((column) => (
                    <Table.Cell key={column.key}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? '')}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            size="sm"
            outline={true}
            variant="secondary"
          >
            이전
          </Button>
          <span className="px-4 py-2 text-sm text-(--color-text-primary)">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            size="sm"
            outline={true}
            variant="secondary"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
