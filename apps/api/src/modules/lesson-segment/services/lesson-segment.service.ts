import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { Lesson } from '../../../database/entities/lesson.entity';
import { LessonSegment } from '../../../database/entities/lesson-segment.entity';
import { CourseService } from '../../course/services/course.service';
import { TranslationService } from '../../localization/services/translation.service';
import { SegmentCatalogService } from '../../segment-catalog/services/segment-catalog.service';
import { LessonSegmentRepository } from '../repositories/lesson-segment.repository';
import { ICreateSegmentParams } from '../structs/create-segment-params.interface';
import { ISegmentContentContext } from '../structs/kind-handler.interface';
import { IReorderSegmentsParams } from '../structs/reorder-segments-params.interface';
import { IUpdateSegmentParams } from '../structs/update-segment-params.interface';
import { KindHandlerRegistryService } from './kind-handler-registry.service';

@Injectable()
export class LessonSegmentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly lessonSegmentRepository: LessonSegmentRepository,
    private readonly segmentCatalogService: SegmentCatalogService,
    private readonly kindHandlerRegistry: KindHandlerRegistryService,
    private readonly courseService: CourseService,
    private readonly translationService: TranslationService,
  ) {}

  /**
   * Atomically creates a segment and its template content in one transaction:
   *   1. Resolve the SegmentKind → its handler (by key).
   *   2. Validate `?lang=` against the lesson's course (if provided).
   *   3. Handler inserts the content rows (+ translations for `lang`), returns
   *      the root content row id.
   *   4. Insert the LessonSegment pointing at that row.
   * Any failure rolls the whole thing back — no orphaned content/translation rows.
   */
  async createSegment(params: ICreateSegmentParams): Promise<LessonSegment> {
    // Resolve the kind by its stable key (what the frontend sends); the
    // resolved row gives us both the handler key and the id for the FK.
    const kind = await this.segmentCatalogService.getKindByKeyOrFail(params.SegmentKindKey);
    const handler = this.kindHandlerRegistry.get(kind.key!);

    // Validate the translation language against the lesson's course. Undefined
    // when `?lang=` is omitted → the handler receives no context and writes
    // source content only.
    const lang = await this.validateLangForLesson(params.LessonId, params.lang);

    const maxOrder = await this.lessonSegmentRepository.getMaxOrderByLesson(params.LessonId);
    const order = params.order ?? (maxOrder === null ? 0 : maxOrder + 1);

    return this.dataSource.transaction(async (manager) => {
      const ctx = this.buildContentContext(manager, lang);
      const contentRowId = await handler.createContent(params.content, manager, ctx);

      const segment = manager.create(LessonSegment, {
        LessonId: params.LessonId,
        SegmentKindId: kind.id,
        SegmentContentRowId: contentRowId,
        title: params.title ?? null,
        description: params.description ?? null,
        order,
      });

      return manager.save(segment);
    });
  }

  /**
   * Validates `?lang=` against the lesson's owning course. Returns the language
   * to translate into (or `undefined` when none was requested). Rejects a
   * language the course doesn't declare, or equal to the source language
   * (source text lives on entity columns, never in Translation).
   */
  private async validateLangForLesson(
    LessonId: string,
    lang?: string,
  ): Promise<string | undefined> {
    if (lang === undefined) {
      return undefined;
    }

    const lesson = await this.dataSource.getRepository(Lesson).findOneBy({ id: LessonId });
    if (!lesson) {
      throw new EntityNotFoundException({ entity: Lesson, ctx: { id: LessonId } });
    }

    const course = await this.courseService.getCourseById(lesson.CourseId!);
    const sourceLanguage = course.sourceLanguageCode!;
    const translationLanguages = course.translationLanguageCodes ?? [];

    if (lang === sourceLanguage) {
      throw new BadRequestException(
        `Language "${lang}" is the course source language; translations are stored only for other languages.`,
      );
    }
    if (!translationLanguages.includes(lang)) {
      throw new BadRequestException(
        `Language "${lang}" is not available for this course. Available: ${translationLanguages.join(
          ', ',
        )}`,
      );
    }

    return lang;
  }

  /**
   * Builds the translation-write context handed to a handler's `createContent`.
   * With a `lang`, `writeTranslation` upserts each non-empty slot in the given
   * transaction. Without a `lang`, empty values are ignored but a non-empty
   * translation is rejected with 400 (the client sent a translation but no
   * `?lang=` to say which language it belongs to).
   */
  private buildContentContext(manager: EntityManager, lang?: string): ISegmentContentContext {
    return {
      lang,
      writeTranslation: async (entityType, EntityId, field, value) => {
        if (value === null || value === undefined || value === '') {
          return;
        }
        if (!lang) {
          throw new BadRequestException(
            'A translation was provided but no `?lang=` was given. Add `?lang=<code>` or omit the translation fields.',
          );
        }
        await this.translationService.upsertInTransaction(manager, {
          entityType,
          EntityId,
          field,
          languageCode: lang,
          value,
        });
      },
    };
  }

  /**
   * Full-replace edit of a segment (the add/edit drawer sends the same body).
   * The kind is fixed — the body carries no `SegmentKindKey`; it's taken from
   * the existing segment. In one transaction:
   *   1. Validate `?lang=` against the lesson's course.
   *   2. Delete the old content subtree's translations (polymorphic — no FK
   *      cascade), then the old content rows (children cascade at the DB level).
   *   3. Recreate the content (+ translations) from the body via the handler.
   *   4. Repoint the segment at the new content row and update its
   *      title/description/order.
   */
  async replaceSegment(SegmentId: string, params: IUpdateSegmentParams): Promise<LessonSegment> {
    const segment = await this.lessonSegmentRepository.findByIdWithKind(SegmentId);
    if (!segment) {
      throw new EntityNotFoundException({ entity: LessonSegment, ctx: { id: SegmentId } });
    }

    const handler = this.kindHandlerRegistry.get(segment.SegmentKind!.key!);
    const lang = await this.validateLangForLesson(segment.LessonId!, params.lang);

    // Collect the old content's translatable refs before the transaction —
    // the rows still exist, so the handler can enumerate them for cleanup.
    const oldLoaded = await handler.loadContent(segment.SegmentContentRowId!);

    return this.dataSource.transaction(async (manager) => {
      await this.translationService.deleteForRefsInTransaction(manager, oldLoaded.refs);
      await handler.deleteContent(segment.SegmentContentRowId!, manager);

      const ctx = this.buildContentContext(manager, lang);
      const newContentRowId = await handler.createContent(params.content, manager, ctx);

      await manager.update(
        LessonSegment,
        { id: SegmentId },
        {
          SegmentContentRowId: newContentRowId,
          title: params.title ?? null,
          description: params.description ?? null,
          ...(params.order !== undefined ? { order: params.order } : {}),
        },
      );

      return manager.findOneByOrFail(LessonSegment, { id: SegmentId });
    });
  }

  /**
   * Deletes a segment and its template content in one transaction. The handler
   * removes the content row (children cascade at the DB level); then the
   * segment row is removed.
   */
  async deleteSegment(SegmentId: string): Promise<void> {
    const segment = await this.lessonSegmentRepository.findByIdWithKind(SegmentId);
    if (!segment) {
      throw new EntityNotFoundException({ entity: LessonSegment, ctx: { id: SegmentId } });
    }

    const handler = this.kindHandlerRegistry.get(segment.SegmentKind!.key!);

    await this.dataSource.transaction(async (manager) => {
      await handler.deleteContent(segment.SegmentContentRowId!, manager);
      await manager.delete(LessonSegment, { id: SegmentId });
    });
  }

  async reorderSegments(params: IReorderSegmentsParams): Promise<void> {
    const { LessonId, items } = params;

    const lessonSegments = await this.lessonSegmentRepository.findIdsByLesson(LessonId);
    const lessonSegmentIds = new Set(lessonSegments.map((s) => s.id!));

    const requestedIds = new Set<string>();
    for (const { SegmentId } of items) {
      if (!lessonSegmentIds.has(SegmentId)) {
        throw new BadRequestException(`Segment ${SegmentId} does not belong to lesson ${LessonId}`);
      }
      requestedIds.add(SegmentId);
    }

    // Re-index sequentially by sorted position rather than trusting the
    // client's raw `order` values — otherwise non-contiguous client orders
    // (e.g. 10, 20) overlap the appended items' indices. Explicitly-ordered
    // items come first (in requested order), then untouched items keep their
    // relative order after them.
    const orderedIds = [...items].sort((a, b) => a.order - b.order).map((i) => i.SegmentId);
    const appendedIds = lessonSegments.filter((s) => !requestedIds.has(s.id!)).map((s) => s.id!);
    const finalOrder = [...orderedIds, ...appendedIds];

    await this.dataSource.transaction(async (manager) => {
      for (let index = 0; index < finalOrder.length; index++) {
        await manager.update(LessonSegment, { id: finalOrder[index] }, { order: index });
      }
    });
  }
}
