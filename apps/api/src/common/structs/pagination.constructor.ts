export interface IPaginationParams {
  page?: number;
  limit?: number;
}

export class Pagination {
  constructor(pagination: IPaginationParams, count: number) {
    this.totalItems = count;
    this.page = Number(pagination.page) || 1;
    this.perPage = Number(pagination.limit) || 10;
    this.total = Math.floor(count / this.perPage) + (count % this.perPage > 0 ? 1 : 0);
  }

  page: number;

  total: number;

  perPage: number;

  totalItems: number;
}
