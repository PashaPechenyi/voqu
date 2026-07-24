import { Lesson } from '../../../database/entities/lesson.entity';
import { LocalizedResolver } from '../../localization/services/localized-resolver';
import { LocalizedField } from '../../localization/structs/localized-value.constructor';
import { TranslatableEntityType } from '../../localization/structs/translatable-entity-type.enum';
import { SegmentView } from './lesson-content.constructor';

/**
 * The full localized lesson read shape (§6.3): lesson-level fields plus its
 * ordered, fully-expanded segments.
 */
export class LessonDetails {
  constructor(
    lesson: Lesson,
    segments: SegmentView[],
    resolver: LocalizedResolver,
    /** the course's source language — the language every `value` is in */
    sourceLanguage: string,
    /**
     * the language every `translation` is in (the requested/defaulted `?lang=`),
     * or `null` when no translation language applies
     */
    translationLanguage: string | null,
  ) {
    this.id = lesson.id!;
    this.CourseId = lesson.CourseId!;
    this.sourceLanguage = sourceLanguage;
    this.translationLanguage = translationLanguage;
    this.title = resolver.resolve(
      TranslatableEntityType.Lesson,
      lesson.id!,
      'title',
      lesson.title!,
    );
    this.subtitle = resolver.resolveNullable(
      TranslatableEntityType.Lesson,
      lesson.id!,
      'subtitle',
      lesson.subtitle,
    );
    this.description = resolver.resolveNullable(
      TranslatableEntityType.Lesson,
      lesson.id!,
      'description',
      lesson.description,
    );
    this.order = lesson.order!;
    this.status = lesson.status!;
    this.duration = lesson.duration ?? null;
    this.segments = segments;
  }

  id: string;
  CourseId: string;
  sourceLanguage: string;
  translationLanguage: string | null;
  title: LocalizedField;
  subtitle: LocalizedField | null;
  description: LocalizedField | null;
  order: number;
  status: string;
  duration: number | null;
  segments: SegmentView[];
}
