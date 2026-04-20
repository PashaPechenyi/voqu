import { generatePaginatedListResponseDto } from '../../../../common/http/dto/paginated-list-response.dto';
import { CourseListItem } from '../../structs/course-list-item.constructor';

export class CourseListResponseDto extends generatePaginatedListResponseDto(CourseListItem) {}
