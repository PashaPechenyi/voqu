import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Course } from '../../../database/entities/course.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class CourseRepository extends BaseRepository<Course> {
  constructor(dataSource: DataSource) {
    super(dataSource, Course);
  }
}
