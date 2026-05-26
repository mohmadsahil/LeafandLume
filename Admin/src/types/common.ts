export type ID = string;

export type Paginated<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type SortDirection = "asc" | "desc";

export type QueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";
