import { LessonSegment } from '../../../database/entities/lesson-segment.entity';
import { LocalizedResolver } from '../../localization/services/localized-resolver';
import { LocalizedField } from '../../localization/structs/localized-value.constructor';
import { TranslatableEntityType } from '../../localization/structs/translatable-entity-type.enum';

/**
 * The localized envelope around one segment's content. The template-specific
 * body (`wordlist` / `grammarTopic` / …) is produced by the segment kind's
 * handler and spread into this object, so the segment carries both its
 * catalog metadata and its content in one node (§6.3).
 */
export class SegmentView {
  constructor(segment: LessonSegment, content: object | null, resolver: LocalizedResolver) {
    this.id = segment.id!;
    this.order = segment.order!;
    // Plain code strings; the localized display names for types/kinds live on
    // the catalog endpoints (GET /segment-type, /segment-kind) that feed the
    // admin dropdowns.
    this.segmentType = segment.SegmentKind!.SegmentType!.key!;
    this.segmentKind = segment.SegmentKind!.key!;
    this.title = resolver.resolveNullable(
      TranslatableEntityType.LessonSegment,
      segment.id!,
      'title',
      segment.title,
    );
    this.description = resolver.resolveNullable(
      TranslatableEntityType.LessonSegment,
      segment.id!,
      'description',
      segment.description,
    );
    // Merge the handler-produced content body (e.g. { wordlist: {...} }).
    Object.assign(this, content ?? {});
  }

  id: string;
  order: number;
  segmentType: string;
  segmentKind: string;
  title: LocalizedField | null;
  description: LocalizedField | null;
}
