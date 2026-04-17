import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CourseController } from './http/controllers/course.controller';
import { CourseService } from './services/course.service';
import { CourseRepository } from './repositories/course.repository';

@Module({
  imports: [UserModule],
  controllers: [CourseController],
  providers: [CourseRepository, CourseService],
  exports: [CourseService],
})
export class CourseModule {}
