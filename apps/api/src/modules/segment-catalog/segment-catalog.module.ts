import { Module } from '@nestjs/common';
import { SegmentKindRepository } from './repositories/segment-kind.repository';
import { SegmentCatalogService } from './services/segment-catalog.service';

/**
 * The segment catalog (SegmentType / SegmentKind) is seeded from code and is
 * the source of truth for the FK on LessonSegment. It has no HTTP surface —
 * the frontend holds the type/kind list as static constants; the service is
 * used internally by LessonSegmentService to validate `SegmentKindId` on
 * segment creation.
 */
@Module({
  providers: [SegmentKindRepository, SegmentCatalogService],
  exports: [SegmentCatalogService],
})
export class SegmentCatalogModule {}
