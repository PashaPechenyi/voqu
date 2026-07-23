import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseService } from '../../course/services/course.service';
import { LessonListItem } from '../structs/lesson-list-item.constructor';
import { ICreateLessonParams } from '../structs/create-lesson-params.interface';
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

    // New lessons go to the end: max order of the course's lessons + 1 (0 if none).
    const maxOrder = await this.lessonRepository.getMaxOrderByCourse(params.CourseId);
    const order = (maxOrder || 0) + 1;

    return this.lessonRepository.create(new Lesson({ ...params, order }));
  }

  async listLessons(CourseId: string): Promise<LessonListItem[]> {
    return this.lessonRepository.getListByCourseId(CourseId);
  }

  async getLessonById(LessonId: string): Promise<Lesson> {
    return this.lessonRepository.getOneByIdOrFail(LessonId);
  }

  /**
   * Resolves everything the lesson-details read needs for localization:
   * loads the lesson + its course, and validates the requested translation
   * language against the course's `translationLanguageCodes`.
   *
   * - The course's `sourceLanguageCode` is the language the content is
   *   authored in (untranslated fields fall back to it).
   * - `lang` (from `?lang=`) is optional. When provided it must be one of the
   *   course's translation languages (or the source language); a value outside
   *   that set is rejected with 400.
   * - When `lang` is omitted, it defaults to the course's first translation
   *   language (`translationLanguageCodes[0]`). If the course has no
   *   translation languages, it falls back to source text.
   */
  async resolveLessonForDetails(
    LessonId: string,
    lang?: string,
  ): Promise<{ lesson: Lesson; lang?: string; sourceLanguage: string }> {
    const lesson = await this.lessonRepository.getOneByIdOrFail(LessonId);
    const course = await this.courseService.getCourseById(lesson.CourseId!);

    const sourceLanguage = course.sourceLanguageCode!;
    const translationLanguages = course.translationLanguageCodes ?? [];

    if (lang !== undefined && lang !== sourceLanguage && !translationLanguages.includes(lang)) {
      throw new BadRequestException(
        `Language "${lang}" is not available for this course. Available: ${[
          sourceLanguage,
          ...translationLanguages,
        ].join(', ')}`,
      );
    }

    // Default to the course's first translation language when none requested.
    const resolvedLang = lang ?? translationLanguages[0];

    return { lesson, lang: resolvedLang, sourceLanguage };
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
