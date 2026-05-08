import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Course } from '../../../../database/entities/course.entity';
import { CourseStatus } from '../../structs/course-status.enum';

export class CourseResponseDto extends BaseResponseDto {
  constructor(course: Course) {
    super();
    this.id = course.id!;
    this.name = course.name!;
    this.description = course.description ?? null;
    this.status = course.status!;
    this.Level = {
      id: course.Level!.id!,
      name: course.Level!.name!,
      cefrLevel: course.Level!.cefrLevel!,
    };
    this.Owner = {
      id: course.Owner!.id!,
      firstName: course.Owner!.firstName!,
      lastName: course.Owner!.lastName!,
      email: course.Owner!.email!,
    };
    this.createdAt = course.createdAt!;
    this.updatedAt = course.updatedAt!;
  }

  id: string;

  name: string;

  description: string | null;

  status: CourseStatus;

  Level: {
    id: string;
    name: string;
    cefrLevel: string;
  };

  Owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  createdAt: string;

  updatedAt: string;
}
