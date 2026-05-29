import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Lesson } from '../../../database/entities/lesson.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { LessonListItem } from '../structs/lesson-list-item.constructor';
import { IFindLessonListParams } from '../structs/find-lesson-list-params.interface';
import { IReorderLessonItem } from '../structs/reorder-lessons-params.interface';

@Injectable()
export class LessonRepository extends BaseRepository<Lesson> {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource, Lesson);
  }

  async findListPaginated(params: IFindLessonListParams): Promise<[LessonListItem[], number]> {
    const { CourseId, page, limit, sorts, search } = params;

    const queryBuilder = this.createQueryBuilder('Lesson')
      .select([
        'Lesson.id',
        'Lesson.CourseId',
        'Lesson.title',
        'Lesson.subtitle',
        'Lesson.description',
        'Lesson.order',
        'Lesson.status',
        'Lesson.createdAt',
        'Lesson.updatedAt',
      ])
      .orderBy('Lesson.order', 'ASC')
      .addOrderBy('Lesson.createdAt', 'ASC');

    if (CourseId) {
      queryBuilder.andWhere('Lesson.CourseId = :CourseId', { CourseId });
    }

    return this.createListQueryBuilder(queryBuilder, this.listFieldsMap)
      .setSearch(search)
      .setSorts(sorts)
      .setPagination({ page, limit })
      .mapToClass(LessonListItem)
      .getManyAndCount();
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

  private readonly listFieldsMap = Object.freeze({
    id: 'Lesson.id',
    CourseId: 'Lesson.CourseId',
    title: 'Lesson.title',
    status: 'Lesson.status',
    order: 'Lesson.order',
    createdAt: 'Lesson.createdAt',
    updatedAt: 'Lesson.updatedAt',
  });
}
