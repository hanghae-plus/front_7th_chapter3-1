import { useEffect, useState } from 'react';

type TableData<T> = {
  [K in keyof T]: T[K];
};

const useTable = <T>({ tableData, pageSize }: { tableData: TableData<T>[]; pageSize: number }) => {
  const [pageTableData, setPageTableData] = useState<TableData<T>[]>(tableData);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (tableData.length > 0) {
      getPageData(tableData, pageSize, currentPage);
    }
  }, [tableData, pageSize, currentPage]);

  const getPageData = (tableData: TableData<T>[], pageSize: number, currentPage: number) => {
    const pageData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    setPageTableData(pageData);
    setTotalPages(Math.ceil(pageData.length / pageSize));
  };

  return {
    pageTableData,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};

export default useTable;
