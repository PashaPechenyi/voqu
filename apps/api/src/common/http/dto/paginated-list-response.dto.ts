import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginatedList } from '../../structs/paginated-list.constructor';
import { Pagination } from '../../structs/pagination.constructor';
import { BaseResponseDto } from './base-response.dto';

export const generatePaginatedListResponseDto = <T>(Item: new (...args: any[]) => T) => {
  class PaginatedListResponseDto extends BaseResponseDto implements PaginatedList<T> {
    constructor(data: Pick<PaginatedListResponseDto, 'items' | 'pagination'>) {
      super();
      Object.assign(this, data);
    }

    @Type(() => Item)
    @ValidateNested({ each: true })
    items: T[];

    pagination: Pagination;
  }

  return PaginatedListResponseDto;
};
