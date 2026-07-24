import { Injectable } from '@nestjs/common';
import { Brackets, EntityManager } from 'typeorm';
import { Translation } from '../../../database/entities/translation.entity';
import { IEntityRef, TranslationRepository } from '../repositories/translation.repository';
import { IFindTranslationsParams } from '../structs/find-translations-params.interface';
import { IUpsertTranslationParams } from '../structs/upsert-translation-params.interface';
import { buildLanguageChain } from '../structs/language-chain.helper';
import { LocalizedResolver } from './localized-resolver';

@Injectable()
export class TranslationService {
  constructor(private readonly translationRepository: TranslationRepository) {}

  /**
   * Upserts a single translation slot, keyed by
   * `(entityType, EntityId, field, languageCode)`. Bumps `version` on update.
   */
  async upsert(params: IUpsertTranslationParams): Promise<Translation> {
    const existing = await this.translationRepository.getOneBy({
      entityType: params.entityType,
      EntityId: params.EntityId,
      field: params.field,
      languageCode: params.languageCode,
    });

    if (existing) {
      return this.translationRepository.update(existing.id!, {
        value: params.value,
        version: (existing.version ?? 1) + 1,
      });
    }

    return this.translationRepository.create(new Translation({ ...params, version: 1 }));
  }

  /**
   * Upserts a translation slot inside a caller-supplied transaction — used
   * when content rows and their translations are created atomically (e.g. the
   * segment-create flow). Same key and version semantics as `upsert`, but every
   * read/write goes through `manager` so a failure rolls back the content too.
   */
  async upsertInTransaction(
    manager: EntityManager,
    params: IUpsertTranslationParams,
  ): Promise<Translation> {
    const existing = await manager.findOne(Translation, {
      where: {
        entityType: params.entityType,
        EntityId: params.EntityId,
        field: params.field,
        languageCode: params.languageCode,
      },
    });

    if (existing) {
      await manager.update(
        Translation,
        { id: existing.id },
        { value: params.value, version: (existing.version ?? 1) + 1 },
      );
      return manager.findOneByOrFail(Translation, { id: existing.id });
    }

    return manager.save(manager.create(Translation, { ...params, version: 1 }));
  }

  /**
   * Deletes every translation row for a set of `(entityType, EntityId)` refs,
   * inside a caller-supplied transaction. Used when content rows are removed
   * (e.g. full-replace edit) — their translations are keyed polymorphically and
   * would otherwise orphan (no FK cascade). No-op on an empty ref list.
   */
  async deleteForRefsInTransaction(manager: EntityManager, refs: IEntityRef[]): Promise<void> {
    const unique = this.dedupeRefs(refs);
    if (!unique.length) {
      return;
    }
    await manager
      .createQueryBuilder()
      .delete()
      .from(Translation)
      .where(
        new Brackets((outer) => {
          unique.forEach((ref, index) => {
            outer.orWhere(
              new Brackets((inner) => {
                inner
                  .where(`"entityType" = :entityType_${index}`, {
                    [`entityType_${index}`]: ref.entityType,
                  })
                  .andWhere(`"EntityId" = :entityId_${index}`, {
                    [`entityId_${index}`]: ref.EntityId,
                  });
              }),
            );
          });
        }),
      )
      .execute();
  }

  /**
   * Filtered read for the generic admin endpoint.
   */
  async find(params: IFindTranslationsParams): Promise<Translation[]> {
    return this.translationRepository.findByFilters(params);
  }

  /**
   * Batched fetch of every translation for the given entity refs and language
   * chain — the single translation round-trip per request.
   */
  async findFor(refs: IEntityRef[], languageChain: string[]): Promise<Translation[]> {
    return this.translationRepository.findForEntities(refs, languageChain);
  }

  /**
   * Builds a per-request `LocalizedResolver`: expands the requested language
   * into a fallback chain, runs one batched query for the given entity refs,
   * and returns a resolver the response layer queries synchronously.
   *
   * `sourceLanguage` is the language the content is authored in (e.g. the
   * course's `sourceLanguageCode`); it's what untranslated fields fall back to
   * and is resolved from the entity column, never from a Translation row.
   */
  async buildResolver(
    refs: IEntityRef[],
    requestedLang?: string,
    sourceLanguage = 'en',
  ): Promise<LocalizedResolver> {
    // The chain already excludes the source language, so it is exactly the set
    // of translation languages to fetch — nothing else to filter out.
    const languageChain = buildLanguageChain(requestedLang, sourceLanguage);

    // Dedupe refs so repeated `(entityType, EntityId)` pairs (e.g. the same
    // SegmentType across many segments) don't multiply the query's OR-clause.
    const uniqueRefs = this.dedupeRefs(refs);

    const translations = await this.findFor(uniqueRefs, languageChain);
    return new LocalizedResolver(translations, languageChain);
  }

  private dedupeRefs(refs: IEntityRef[]): IEntityRef[] {
    const seen = new Set<string>();
    const unique: IEntityRef[] = [];
    for (const ref of refs) {
      const key = `${ref.entityType}|${ref.EntityId}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(ref);
      }
    }
    return unique;
  }
}
