import { EntityManager } from 'typeorm';
import { IEntityRef } from '../../localization/repositories/translation.repository';
import { LocalizedResolver } from '../../localization/services/localized-resolver';

/**
 * Result of loading a segment's content row plus every translatable
 * `(entityType, EntityId)` pair inside it. The refs feed the single batched
 * translation query; `data` is whatever the handler needs later to serialize.
 */
export interface ILoadedContent {
  /** raw loaded content tree, handler-specific shape */
  data: unknown;
  /** translatable entity refs contributed by this content, for batch resolve */
  refs: IEntityRef[];
}

/**
 * Per-create translation context, always handed to `createContent`. The handler
 * calls `writeTranslation` for every translatable field as it inserts the
 * owning row; the context decides what to do based on whether `?lang=` was
 * given:
 *   - lang present  → upsert a Translation row (same transaction as content).
 *   - lang absent   → empty values are ignored, but a non-empty translation
 *                     raises 400 (the client sent a translation without saying
 *                     which language it is for).
 * Empty/absent values are always skipped, so handlers can pass optional fields
 * without pre-checking.
 */
export interface ISegmentContentContext {
  /** the translation language from `?lang=`, or `undefined` when omitted */
  lang?: string;
  writeTranslation(
    entityType: string,
    EntityId: string,
    field: string,
    value: string | null | undefined,
  ): Promise<void>;
}

/**
 * A KindHandler owns one SegmentKind (e.g. `wordlist`). The
 * registry maps `SegmentKind.key` → handler. Adding a template is: implement
 * this interface, seed one SegmentKind row, call `register(code, handler)`.
 */
export interface IKindHandler {
  /** the SegmentKind.key this handler serves, e.g. 'wordlist' */
  readonly code: string;

  /**
   * Inserts the template's content rows inside the given transaction and
   * returns the id of the root content row (stored as
   * `LessonSegment.SegmentContentRowId`). Calls `ctx.writeTranslation` for each
   * translatable field, in the same transaction (a no-op / 400 when no `?lang=`
   * — see ISegmentContentContext).
   */
  createContent(
    input: unknown,
    manager: EntityManager,
    ctx: ISegmentContentContext,
  ): Promise<string>;

  /**
   * Loads the full content tree for one content row and reports its
   * translatable refs. Runs before the resolver is built.
   */
  loadContent(contentRowId: string): Promise<ILoadedContent>;

  /**
   * Shapes the localized response object for a loaded content row, using the
   * per-request resolver for `{ value, lang }` fields.
   */
  serializeContent(loaded: ILoadedContent, resolver: LocalizedResolver): unknown;

  /**
   * Deletes the content row (and its children) for a segment being removed.
   */
  deleteContent(contentRowId: string, manager: EntityManager): Promise<void>;
}
