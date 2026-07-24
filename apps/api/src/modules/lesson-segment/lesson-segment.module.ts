import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { LocalizationModule } from '../localization/localization.module';
import { SegmentCatalogModule } from '../segment-catalog/segment-catalog.module';
import { LessonSegmentController } from './http/controllers/lesson-segment.controller';
import { LessonSegmentRepository } from './repositories/lesson-segment.repository';
import { KindHandlerRegistryService } from './services/kind-handler-registry.service';
import { LessonContentService } from './services/lesson-content.service';
import { LessonSegmentService } from './services/lesson-segment.service';

@Module({
  imports: [SegmentCatalogModule, LocalizationModule, CourseModule],
  controllers: [LessonSegmentController],
  providers: [
    LessonSegmentRepository,
    KindHandlerRegistryService,
    LessonSegmentService,
    LessonContentService,
  ],
  // KindHandlerRegistryService is exported so template modules (vocabulary,
  // grammar, …) can register their handlers on init. LessonContentService is
  // exported so the lesson read path can assemble the full localized tree.
  exports: [
    KindHandlerRegistryService,
    LessonSegmentService,
    LessonContentService,
    LessonSegmentRepository,
  ],
})
export class LessonSegmentModule {}
