import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "../ui/Pagination";
import useTable from "../../hooks/useTable";

function DataTable({
  tableData,
  columns,
  pageSize,
}: {
  tableData: any[];
  columns: {
    key: string;
    header: string;
    width?: string;
    render?: (row: any) => React.ReactNode;
  }[];
  pageSize: number;
}) {
  const { pageTableData, currentPage, setCurrentPage, totalPages } = useTable({
    tableData,
    pageSize,
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.width ? `w-[${column.width}]` : ""}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageTableData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                const value = row[column.key as keyof typeof row];

                return <TableCell key={column.key}>{column.render ? column.render(row) : value || "-"}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </div>
  );
}

export default DataTable;
