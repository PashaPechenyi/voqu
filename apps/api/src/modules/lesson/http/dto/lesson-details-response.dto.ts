import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { LessonDetails } from '../../../lesson-segment/structs/lesson-details.constructor';

export class LessonDetailsResponseDto extends BaseResponseDto {
  constructor(lesson: LessonDetails) {
    super();
    this.lesson = lesson;
  }

  lesson: LessonDetails;
}
