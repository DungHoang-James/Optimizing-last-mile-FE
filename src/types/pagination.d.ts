export type Pagination<T> = {
  currentPage?: number;
  totalPage?: number;
  pageSize?: number;
  totalCount?: number;
  data?: T[];
  hasPrevious?: boolean;
  hasNext?: boolean;
};

export type StateNavigation = {
  search: string;
  page: number;
  pageSize: number;
};
