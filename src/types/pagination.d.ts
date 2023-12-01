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
  page: number;
  pageSize: number;
};
