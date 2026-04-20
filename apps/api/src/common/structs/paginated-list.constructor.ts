import { Pagination } from './pagination.constructor';

export class PaginatedList<E> {
  constructor(items: E[], pagination: Pagination) {
    this.items = items;
    this.pagination = pagination;
  }

  items: E[];

  pagination: Pagination;

  public static create<T>(
    items: T[],
    count: number,
    { page, limit }: { page?: number; limit?: number },
  ): PaginatedList<T> {
    return new PaginatedList(items, new Pagination({ page, limit }, count));
  }
}
