import * as React from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  striped?: boolean;
  hover?: boolean;
  onRowClick?: (row: any) => void;
  
  entityType?: 'user' | 'post';
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  striped = false,
  hover = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  // 도메인별 셀 렌더링 (임시 - 나중에 부모로 이동 예정)
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    if (entityType === 'user') {
      if (columnKey === 'role') {
        return <Badge userRole={value} showIcon />;
      }
      if (columnKey === 'status') {
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
          <div className="flex gap-2 whitespace-nowrap">
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
          <div className="flex gap-2 whitespace-nowrap">
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
        );
      }
    }

    return value;
  };

  return (
    <ShadcnTable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              style={column.width ? { width: column.width } : undefined}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            onClick={() => onRowClick?.(row)}
            className={cn(
              hover && "cursor-pointer hover:bg-black/5",
              striped && rowIndex % 2 === 1 && "bg-[#fafafa]"
            )}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>
                {entityType ? renderCell(row, column.key) : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadcnTable>
  );
};
