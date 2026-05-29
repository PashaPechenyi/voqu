import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { LessonController } from './http/controllers/lesson.controller';
import { LessonService } from './services/lesson.service';
import { LessonRepository } from './repositories/lesson.repository';

@Module({
  imports: [CourseModule],
  controllers: [LessonController],
  providers: [LessonRepository, LessonService],
  exports: [LessonService],
})
export class LessonModule {}
