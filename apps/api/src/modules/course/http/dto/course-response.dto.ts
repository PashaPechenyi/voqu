import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Course } from '../../../../database/entities/course.entity';

export class CourseResponseDto extends BaseResponseDto {
  constructor(course: Course) {
    super();
    this.course = course;
  }

  course: Course;
}
