interface UserStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  admins: number;
}

interface PostStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

interface PaginatedResponse<T, S = Record<string, number>> {
  results: T[];
  total: number;
  stats: S;
}

export type { PaginatedResponse, UserStats, PostStats };
