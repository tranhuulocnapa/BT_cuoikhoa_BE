export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export function calculatePagination(
  page: number,
  limit: number,
): { skip: number; take: number } {
  const pageNum = Math.max(page || 1, 1);
  const limitNum = Math.max(Math.min(limit || 10, 100), 1);
  return {
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
  };
}

export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  return {
    page: Math.max(page || 1, 1),
    limit: Math.max(Math.min(limit || 10, 100), 1),
    total,
    totalPages: Math.ceil(total / (limit || 10)),
  };
}
