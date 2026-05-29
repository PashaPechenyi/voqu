import { SearchInput, Sort } from '../../../common/database/list-query.builder';

export interface IFindLessonListParams {
  CourseId?: string;
  page?: number;
  limit?: number;
  sorts?: Sort[];
  search?: SearchInput;
}
