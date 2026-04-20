import { Course } from '../../../database/entities/course.entity';
import { CourseStatus } from './course-status.enum';

export class CourseListItem {
  constructor(data: Course) {
    this.id = data.id!;
    this.name = data.name!;
    this.status = data.status!;
    this.LevelId = data.LevelId!;
    this.OwnerId = data.OwnerId!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
  }

  id: string;

  name: string;

  status: CourseStatus;

  LevelId: string;

  OwnerId: string;

  createdAt: string;

  updatedAt: string;
}
