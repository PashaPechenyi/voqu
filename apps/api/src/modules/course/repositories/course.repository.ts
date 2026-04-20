import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Course } from '../../../database/entities/course.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { CourseListItem } from '../structs/course-list-item.constructor';
import { IFindCourseListParams } from '../structs/find-course-list-params.interface';

@Injectable()
export class CourseRepository extends BaseRepository<Course> {
  constructor(dataSource: DataSource) {
    super(dataSource, Course);
  }

  async findListPaginated(params: IFindCourseListParams): Promise<[CourseListItem[], number]> {
    const { page, limit, sorts, search } = params;

    const queryBuilder = this.createQueryBuilder('Course')
      .select(Object.values(this.listFieldsMap))
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
