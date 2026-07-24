import { Course } from '../../../database/entities/course.entity';
import { CourseStatus } from './course-status.enum';

export class AdminCourseDetails {
  constructor(data: Course) {
    this.id = data.id!;
    this.name = data.name!;
    this.description = data.description ?? null;
    this.status = data.status!;
    this.sourceLanguageCode = data.sourceLanguageCode!;
    this.translationLanguageCodes = data.translationLanguageCodes ?? [];
    this.Level = {
      id: data.Level!.id!,
      name: data.Level!.name!,
      cefrLevel: data.Level!.cefrLevel!,
    };
    this.Owner = {
      id: data.Owner!.id!,
      firstName: data.Owner!.firstName!,
      lastName: data.Owner!.lastName!,
      email: data.Owner!.email!,
    };
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
  }

  id: string;

  name: string;

  description: string | null;

  status: CourseStatus;

  sourceLanguageCode: string;

  translationLanguageCodes: string[];

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
