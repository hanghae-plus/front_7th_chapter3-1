interface PaginatedResponse<T> {
  results: T[];
  total: number;
}

export type { PaginatedResponse };
