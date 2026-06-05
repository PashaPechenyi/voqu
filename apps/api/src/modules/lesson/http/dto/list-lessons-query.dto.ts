import { PaginationDto } from '../../../../common/http/dto/pagination.dto';

/**
 * Query for listing lessons. `CourseId` is taken from the route param,
 * not the query.
 */
export class ListLessonsQueryDto extends PaginationDto {}
