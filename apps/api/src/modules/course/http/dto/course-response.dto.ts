import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Course } from '../../../../database/entities/course.entity';
import { AdminCourseDetails } from '../../structs/admin-course-details.constructor';

export class CourseResponseDto extends BaseResponseDto {
  constructor(course: Course) {
    super();
    this.course = new AdminCourseDetails(course);
  }

  course: AdminCourseDetails;
}
