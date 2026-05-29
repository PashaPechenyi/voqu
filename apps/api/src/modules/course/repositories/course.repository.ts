import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { Course } from '../../../database/entities/course.entity';
import { Lesson } from '../../../database/entities/lesson.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { CourseListItem } from '../structs/course-list-item.constructor';
import { IFindCourseListParams } from '../structs/find-course-list-params.interface';

@Injectable()
export class CourseRepository extends BaseRepository<Course> {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource, Course);
  }

  // FIXME: check do we need it or just add cascade update/delete to migration
  async deleteWithLessons(id: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(Lesson, { CourseId: id });
      const result = await manager.delete(Course, id);
      if (!result.affected) {
        throw new EntityNotFoundException({ entity: Course, ctx: { id } });
      }
    });
  }

  async getOneByIdWithRelationsOrFail(id: string): Promise<Course> {
    const course = await this.createQueryBuilder('Course')
      .leftJoinAndSelect('Course.Level', 'Level')
      .leftJoinAndSelect('Course.Owner', 'Owner')
      .where('Course.id = :id', { id })
      .getOne();
    if (!course) {
      throw new EntityNotFoundException({ entity: Course, ctx: { id } });
    }
    return course;
  }

  async findListPaginated(params: IFindCourseListParams): Promise<[CourseListItem[], number]> {
    const { page, limit, sorts, search } = params;

    const queryBuilder = this.createQueryBuilder('Course')
      .leftJoinAndSelect('Course.Level', 'Level')
      .leftJoinAndSelect('Course.Owner', 'Owner')
      .select([
        'Course.id',
        'Course.name',
        'Course.description',
        'Course.status',
        'Course.createdAt',
        'Course.updatedAt',
        'Level.id',
        'Level.name',
        'Level.cefrLevel',
        'Owner.id',
        'Owner.firstName',
        'Owner.lastName',
        'Owner.email',
      ])
      .orderBy('Course.createdAt', 'ASC');

    return this.createListQueryBuilder(queryBuilder, this.listFieldsMap)
      .setSearch(search)
      .setSorts(sorts)
      .setPagination({ page, limit })
      .mapToClass(CourseListItem)
      .getManyAndCount();
  }

  private readonly listFieldsMap = Object.freeze({
    id: 'Course.id',
    name: 'Course.name',
    status: 'Course.status',
    LevelId: 'Course.LevelId',
    OwnerId: 'Course.OwnerId',
    createdAt: 'Course.createdAt',
    updatedAt: 'Course.updatedAt',
  });
}
