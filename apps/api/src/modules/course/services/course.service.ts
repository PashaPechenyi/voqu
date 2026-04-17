import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { Course } from '../../../database/entities/course.entity';
import { User } from '../../../database/entities/user.entity';
import { RoleSlug } from '../../role/structs/role-slug.enum';
import { UserRepository } from '../../user/repositories/user.repository';
import { ICreateCourseParams } from '../structs/create-course-params.interface';
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
}
