import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

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
  renderCell?: (row: any, columnKey: string) => React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
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
}) => {
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

  const filteredData =
    searchable && searchTerm
      ? tableData.filter(row =>
          Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const tableClasses = [
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
  ]
    .filter(Boolean)
    .join(' ');

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map(key => ({ key, header: key, width: undefined }))
      : []);

  return (
    <div className="table-container">
      {searchable && (
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '300px',
            }}
          />
        </div>
      )}

      <table className={tableClasses}>
        <thead>
          <tr>
            {actualColumns.map(column => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: sortable ? 'pointer' : 'default',
                  }}
                >
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
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {actualColumns.map(column => (
                <td key={column.key}>
                  {renderCell ? renderCell(row, column.key) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <Button
            size="sm"
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            이전
          </Button>
          <span style={{ padding: '6px 12px' }}>
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
