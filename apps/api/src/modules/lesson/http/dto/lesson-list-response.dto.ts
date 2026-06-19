import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { LessonListItem } from '../../structs/lesson-list-item.constructor';

export class LessonListResponseDto extends BaseResponseDto {
  constructor(items: LessonListItem[]) {
    super();
    this.items = items;
  }

  items: LessonListItem[];
}
