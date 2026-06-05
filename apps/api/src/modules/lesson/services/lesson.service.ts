import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginatedList } from '../../../common/structs/paginated-list.constructor';
import { CourseService } from '../../course/services/course.service';
import { LessonListItem } from '../structs/lesson-list-item.constructor';
import { ICreateLessonParams } from '../structs/create-lesson-params.interface';
import { IListLessonsParams } from '../structs/list-lessons-params.interface';
import { IReorderLessonsParams } from '../structs/reorder-lessons-params.interface';
import { IUpdateLessonStatusParams } from '../structs/update-lesson-status-params.interface';
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

  async updateLessonStatus(LessonId: string, params: IUpdateLessonStatusParams): Promise<Lesson> {
    await this.lessonRepository.getOneByIdOrFail(LessonId);
    return this.lessonRepository.update(LessonId, { status: params.status });
  }

  async deleteLesson(LessonId: string): Promise<void> {
    await this.lessonRepository.getOneByIdOrFail(LessonId);
    await this.lessonRepository.deleteWhere({ id: LessonId });
  }

  async reorderLessons(params: IReorderLessonsParams): Promise<void> {
    const { CourseId, items } = params;

    // Validate the parent course exists (throws EntityNotFoundException otherwise).
    await this.courseService.getCourseById(CourseId);

    const courseLessons = await this.lessonRepository.findIdsByCourse(CourseId);
    const courseLessonIds = new Set(courseLessons.map((lesson) => lesson.id!));

    // Every lesson in the request must belong to this course.
    const requestedIds = new Set<string>();
    for (const { LessonId } of items) {
      if (!courseLessonIds.has(LessonId)) {
        throw new BadRequestException(`Lesson ${LessonId} does not belong to course ${CourseId}`);
      }
      requestedIds.add(LessonId);
    }

    // Lessons that exist in the course but were not included in the request are
    // appended after the explicitly ordered ones, preserving their current order.
    const orderedItems = [...items].sort((a, b) => a.order - b.order);
    let nextOrder = orderedItems.length;
    const appended = courseLessons
      .filter((lesson) => !requestedIds.has(lesson.id!))
      .map((lesson) => ({ LessonId: lesson.id!, order: nextOrder++ }));

    await this.lessonRepository.reorder([...orderedItems, ...appended]);
  }
}
