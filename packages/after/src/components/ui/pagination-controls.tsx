import { Button } from "./button";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
}

export const PaginationControls = ({
  page,
  totalPages,
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
}: PaginationControlsProps) => {
  const formattedPage = Math.max(1, Math.min(page, totalPages));
  const formattedTotal = Math.max(1, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={disabledPrev ?? formattedPage <= 1}
        >
          이전
        </Button>
        <p className="flex items-center whitespace-nowrap text-sm text-muted-foreground">
          {formattedPage.toLocaleString()} / {formattedTotal.toLocaleString()}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={disabledNext ?? formattedPage >= formattedTotal}
        >
          다음
        </Button>
      </div>
    </div>
  );
};


