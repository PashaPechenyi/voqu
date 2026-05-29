import { Lesson } from '../../../database/entities/lesson.entity';
import { LessonStatus } from './lesson-status.enum';

export class LessonListItem {
  constructor(data: Lesson) {
    this.id = data.id!;
    this.CourseId = data.CourseId!;
    this.title = data.title!;
    this.subtitle = data.subtitle ?? null;
    this.description = data.description ?? null;
    this.order = data.order!;
    this.status = data.status as LessonStatus;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
  }

  id: string;

  CourseId: string;

  title: string;

  subtitle: string | null;

  description: string | null;

  order: number;

  status: LessonStatus;

  createdAt: string;

  updatedAt: string;
}
