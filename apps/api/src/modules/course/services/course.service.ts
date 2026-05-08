import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { Course } from '../../../database/entities/course.entity';
import { User } from '../../../database/entities/user.entity';
import { RoleSlug } from '../../role/structs/role-slug.enum';
import { UserRepository } from '../../user/repositories/user.repository';
import { PaginatedList } from '../../../common/structs/paginated-list.constructor';
import { CourseListItem } from '../structs/course-list-item.constructor';
import { ICreateCourseParams } from '../structs/create-course-params.interface';
import { IListCoursesParams } from '../structs/list-courses-params.interface';
import { IUpdateCourseParams } from '../structs/update-course-params.interface';
import { CourseRepository } from '../repositories/course.repository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createCourse(params: ICreateCourseParams): Promise<Course> {
    const owner = await this.userRepository.findOneBySlug(RoleSlug.SuperAdmin);
    if (!owner) {
      throw new EntityNotFoundException({ entity: User, ctx: { roleSlug: RoleSlug.SuperAdmin } });
    }

    return this.courseRepository.create({ ...params, OwnerId: owner.id });
  }

  async updateCourse(id: string, params: IUpdateCourseParams): Promise<Course> {
    await this.courseRepository.getOneByIdOrFail(id);
    return this.courseRepository.update(id, params);
  }

  async getCourseById(id: string): Promise<Course> {
    return this.courseRepository.getOneByIdWithRelationsOrFail(id);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courseRepository.deleteWithLessons(id);
  }

  async listCourses(params: IListCoursesParams): Promise<PaginatedList<CourseListItem>> {
    const { page, limit } = params;
    const isPaginated = page !== undefined || limit !== undefined;

    const effectivePage = page ?? 1;
    const effectiveLimit = isPaginated ? (limit ?? 10) : Number.MAX_SAFE_INTEGER;

    const [items, total] = await this.courseRepository.findListPaginated({
      page: effectivePage,
      limit: effectiveLimit,
    });

    const responseLimit = isPaginated ? effectiveLimit : total || 1;
    return PaginatedList.create(items, total, { page: effectivePage, limit: responseLimit });
  }
}
