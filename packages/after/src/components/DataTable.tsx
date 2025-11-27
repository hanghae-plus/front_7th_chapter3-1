import * as React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  type tableVariants,
} from './ui/table';
import type { VariantProps } from 'class-variance-authority';
import { Pagination, type PaginationProps } from './Pagination';

// Column
interface Column<T> {
  key: keyof T | (string & {});
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (row: T, value: unknown) => React.ReactNode;
}

interface DataTableProps<T> extends VariantProps<typeof tableVariants> {
  columns: Column<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  pagination?: PaginationProps;
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  striped,
  bordered,
  size,
  pagination,
  keyExtractor,
  onRowClick,
  emptyMessage = '데이터가 없습니다.',
}: DataTableProps<T>) {
  const getRowKey = (row: T, index: number): string | number => {
    if (keyExtractor) return keyExtractor(row, index);
    if ('id' in row) return row.id as string | number;
    return index;
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    const value = row[column.key as keyof T];

    if (column.render) {
      return column.render(row, value);
    }

    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  return (
    <div className="space-y-2">
      <Table striped={striped} bordered={bordered} size={size}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead
                key={String(column.key)}
                align={column.align}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
                className="text-muted-foreground py-8"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={getRowKey(row, index)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'cursor-pointer' : undefined}
              >
                {columns.map(column => (
                  <TableCell key={String(column.key)} align={column.align}>
                    {getCellValue(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination && <Pagination {...pagination} />}
    </div>
  );
}

export { DataTable, Pagination };
export type { Column, DataTableProps, PaginationProps };
