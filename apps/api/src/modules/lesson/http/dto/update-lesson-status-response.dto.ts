import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Lesson } from '../../../../database/entities/lesson.entity';
import { LessonListItem } from '../../structs/lesson-list-item.constructor';

export class UpdateLessonStatusResponseDto extends BaseResponseDto {
  constructor(lesson: Lesson) {
    super();
    this.lesson = new LessonListItem(lesson);
  }

  lesson: LessonListItem;
}
