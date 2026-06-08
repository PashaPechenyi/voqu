import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Lesson } from '../../../database/entities/lesson.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { LessonListItem } from '../structs/lesson-list-item.constructor';
import { IReorderLessonItem } from '../structs/reorder-lessons-params.interface';

@Injectable()
export class LessonRepository extends BaseRepository<Lesson> {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource, Lesson);
  }

  /**
   * Returns every lesson of a course, ordered by `order`. Lessons are not
   * paginated — a course's full lesson list is always returned.
   */
  async getListByCourseId(CourseId: string): Promise<LessonListItem[]> {
    const queryBuilder = this.createQueryBuilder('Lesson')
      .where('Lesson.CourseId = :CourseId', { CourseId })
      .orderBy('Lesson.order', 'ASC')
      .addOrderBy('Lesson.createdAt', 'ASC');

    return this.createListQueryBuilder(queryBuilder).mapToClass(LessonListItem).getMany();
  }

  /**
   * Returns the id + order of every lesson in a course, ordered by `order`.
   * Used to validate reorder requests and to append lessons missing from the
   * requested order.
   */
  async findIdsByCourse(CourseId: string): Promise<Pick<Lesson, 'id' | 'order'>[]> {
    return this.createQueryBuilder('Lesson')
      .select(['Lesson.id', 'Lesson.order'])
      .where('Lesson.CourseId = :CourseId', { CourseId })
      .orderBy('Lesson.order', 'ASC')
      .addOrderBy('Lesson.createdAt', 'ASC')
      .getMany();
  }

  /**
   * Returns the highest `order` among a course's lessons, or `null` if the
   * course has no lessons yet.
   */
  async getMaxOrderByCourse(CourseId: string): Promise<number | null> {
    const result = await this.createQueryBuilder('Lesson')
      .select('MAX(Lesson.order)', 'max')
      .where('Lesson.CourseId = :CourseId', { CourseId })
      .getRawOne<{ max: string | null }>();

    return result?.max !== null && result?.max !== undefined ? Number(result.max) : null;
  }

  /**
   * Rewrites the `order` of multiple lessons in a single transaction.
   */
  async reorder(items: IReorderLessonItem[]): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      for (const { LessonId, order } of items) {
        await manager.update(Lesson, { id: LessonId }, { order });
      }
    });
  }
}
