import { SearchInput, Sort } from '../../../common/database/list-query.builder';

export interface IFindCourseListParams {
  page?: number;
  limit?: number;
  sorts?: Sort[];
  search?: SearchInput;
}
