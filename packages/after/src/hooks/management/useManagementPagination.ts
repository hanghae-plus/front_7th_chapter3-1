import { useEffect, useMemo, useState } from "react";

import type { EntityType } from "@/type/management";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

type Entity = User | Post;

interface PaginationOptions {
  pageSize?: number;
  resetKey?: EntityType;
}

export const useManagementPagination = (
  data: Entity[],
  options: PaginationOptions = {}
) => {
  const { pageSize = 10, resetKey } = options;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetKey]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }, [data]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sortedData.length / pageSize)),
    [sortedData, pageSize]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const goToPrevPage = () => setCurrentPage((page) => Math.max(1, page - 1));
  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(totalPages, page + 1));

  return {
    sortedData,
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    goToPrevPage,
    goToNextPage,
    hasPagination: sortedData.length > pageSize,
  };
};
