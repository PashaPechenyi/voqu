import { Injectable } from '@nestjs/common';
import { Lesson } from '../../../database/entities/lesson.entity';
import { LessonSegment } from '../../../database/entities/lesson-segment.entity';
import { IEntityRef } from '../../localization/repositories/translation.repository';
import { TranslationService } from '../../localization/services/translation.service';
import { TranslatableEntityType } from '../../localization/structs/translatable-entity-type.enum';
import { ILoadedContent } from '../structs/kind-handler.interface';
import { LessonSegmentRepository } from '../repositories/lesson-segment.repository';
import { KindHandlerRegistryService } from './kind-handler-registry.service';
import { LessonDetails } from '../structs/lesson-details.constructor';
import { SegmentView } from '../structs/lesson-content.constructor';

/**
 * Assembles the full localized lesson read tree (§6.3) with exactly one
 * translation query:
 *   1. Load the lesson's segments (+ kind/type).
 *   2. Each segment's handler loads its content and reports its translatable
 *      refs.
 *   3. Collect ALL refs (lesson + segments + catalog + content) and build one
 *      resolver — the single batched translation query.
 *   4. Serialize every segment via its handler, then wrap in LessonDetails.
 *
 * Takes an already-loaded Lesson (loaded by the caller) to avoid a dependency
 * cycle with the lesson module.
 */
@Injectable()
export class LessonContentService {
  constructor(
    private readonly lessonSegmentRepository: LessonSegmentRepository,
    private readonly kindHandlerRegistry: KindHandlerRegistryService,
    private readonly translationService: TranslationService,
  ) {}

  /**
   * @param lang           the requested translation language (already validated
   *                       to be one of the course's translation languages)
   * @param sourceLanguage the course's source language — what untranslated
   *                       fields fall back to
   */
  async buildLessonView(
    lesson: Lesson,
    lang: string | undefined,
    sourceLanguage: string,
  ): Promise<LessonDetails> {
    const segments = await this.lessonSegmentRepository.findByLessonWithKind(lesson.id!);

    // Load every segment's content in parallel; keep each handler alongside
    // its loaded content for the serialize pass.
    const loadedSegments = await Promise.all(
      segments.map(async (segment) => {
        const handler = this.kindHandlerRegistry.get(segment.SegmentKind!.key!);
        const loaded = await handler.loadContent(segment.SegmentContentRowId!);
        return { segment, handler, loaded };
      }),
    );

    const refs = this.collectRefs(lesson, loadedSegments);
    const resolver = await this.translationService.buildResolver(refs, lang, sourceLanguage);

    const segmentViews = loadedSegments.map(({ segment, handler, loaded }) => {
      const content = handler.serializeContent(loaded, resolver) as object | null;
      return new SegmentView(segment, content, resolver);
    });

    // The translation language is what every `translation` string is in — the
    // resolved `?lang=`, unless it equals the source (then there is no separate
    // translation language).
    const translationLanguage = lang && lang !== sourceLanguage ? lang : null;

    return new LessonDetails(lesson, segmentViews, resolver, sourceLanguage, translationLanguage);
  }

  private collectRefs(
    lesson: Lesson,
    loadedSegments: {
      segment: LessonSegment;
      loaded: ILoadedContent;
    }[],
  ): IEntityRef[] {
    const refs: IEntityRef[] = [
      { entityType: TranslatableEntityType.Lesson, EntityId: lesson.id! },
    ];

    for (const { segment, loaded } of loadedSegments) {
      refs.push({ entityType: TranslatableEntityType.LessonSegment, EntityId: segment.id! });
      refs.push({
        entityType: TranslatableEntityType.SegmentType,
        EntityId: segment.SegmentKind!.SegmentType!.id!,
      });
      refs.push({
        entityType: TranslatableEntityType.SegmentKind,
        EntityId: segment.SegmentKind!.id!,
      });
      refs.push(...loaded.refs);
    }

    return refs;
  }
}
