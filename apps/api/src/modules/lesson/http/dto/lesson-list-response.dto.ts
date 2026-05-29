import { generatePaginatedListResponseDto } from '../../../../common/http/dto/paginated-list-response.dto';
import { LessonListItem } from '../../structs/lesson-list-item.constructor';

export class LessonListResponseDto extends generatePaginatedListResponseDto(LessonListItem) {}
