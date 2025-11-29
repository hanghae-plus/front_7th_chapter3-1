import { Button } from '@bento/ui/button';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

function Pagination({ page, pageSize, totalCount, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-sm text-muted-foreground">
        {totalCount}개 중 {startItem}-{endItem}
      </p>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => onPageChange(1)}>
          처음
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          이전
        </Button>
        <span className="px-3 py-1 text-sm">
          {page} / {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          다음
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          마지막
        </Button>
      </div>
    </div>
  );
}

export { Pagination };
export type { PaginationProps };
