import { Injectable } from '@nestjs/common';
import { PaginatedList } from '../../../common/structs/paginated-list.constructor';
import { CourseService } from '../../course/services/course.service';
import { LessonListItem } from '../structs/lesson-list-item.constructor';
import { ICreateLessonParams } from '../structs/create-lesson-params.interface';
import { IListLessonsParams } from '../structs/list-lessons-params.interface';
import { IReorderLessonsParams } from '../structs/reorder-lessons-params.interface';
import { LessonRepository } from '../repositories/lesson.repository';
import { Lesson } from '../../../database/entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly courseService: CourseService,
  ) {}

  async createLesson(params: ICreateLessonParams): Promise<Lesson> {
    // Validate the parent course exists (throws EntityNotFoundException otherwise).
    await this.courseService.getCourseById(params.CourseId);

    return this.lessonRepository.create(params as Lesson);
  }

  async listLessons(params: IListLessonsParams): Promise<PaginatedList<LessonListItem>> {
    const { CourseId, page, limit } = params;
    const isPaginated = page !== undefined || limit !== undefined;

    const effectivePage = page ?? 1;
    const effectiveLimit = isPaginated ? (limit ?? 10) : Number.MAX_SAFE_INTEGER;

    const [items, total] = await this.lessonRepository.findListPaginated({
      CourseId,
      page: effectivePage,
      limit: effectiveLimit,
    });

    const responseLimit = isPaginated ? effectiveLimit : total || 1;
    return PaginatedList.create(items, total, { page: effectivePage, limit: responseLimit });
  }

  async reorderLessons(params: IReorderLessonsParams): Promise<void> {
    await this.lessonRepository.reorder(params.items);
  }
}
