import { Translation } from '../../../database/entities/translation.entity';
import { LocalizedField } from '../structs/localized-value.constructor';

/**
 * A per-request lookup object. It is built once (from a single batched
 * `Translation` fetch) and then queried synchronously by response
 * constructors as they walk the content tree — so localizing an entire
 * lesson costs exactly one translation query regardless of size.
 *
 * Not a Nest provider: `TranslationService.buildResolver()` constructs it
 * and hands it to the response layer.
 */
export class LocalizedResolver {
  /** key: `${entityType}|${EntityId}|${field}|${lang}` → translated value */
  private readonly index = new Map<string, string>();

  constructor(
    translations: Translation[],
    /**
     * Ordered translation languages to try, most-preferred first. Does NOT
     * include the source language — source text always comes from the entity
     * column, never from a Translation row.
     */
    private readonly languageChain: string[],
  ) {
    for (const t of translations) {
      this.index.set(this.key(t.entityType!, t.EntityId!, t.field!, t.languageCode!), t.value!);
    }
  }

  private key(entityType: string, entityId: string, field: string, lang: string): string {
    return `${entityType}|${entityId}|${field}|${lang}`;
  }

  /**
   * Finds the best translation for a field by walking the language chain; the
   * first language with a stored translation wins. Returns `null` when none of
   * the requested languages has a translation.
   */
  private lookupTranslation(entityType: string, entityId: string, field: string): string | null {
    for (const lang of this.languageChain) {
      const value = this.index.get(this.key(entityType, entityId, field, lang));
      if (value !== undefined) {
        return value;
      }
    }
    return null;
  }

  /**
   * Resolves one translatable field into the Option A shape: the source-language
   * text is always in `value`; `translation` carries the requested-language
   * variant when it exists, else `null`. The languages themselves are declared
   * once on the lesson, not per field.
   */
  resolve(
    entityType: string,
    entityId: string,
    field: string,
    sourceValue: string,
  ): LocalizedField {
    const translation = this.lookupTranslation(entityType, entityId, field);
    return new LocalizedField(sourceValue, translation);
  }

  /**
   * Same as `resolve` but for nullable source fields. Returns `null` only when
   * the source value is null/undefined AND no translation exists. If a
   * translation exists but the source is empty, the source `value` is an empty
   * string and `translation` carries the variant.
   */
  resolveNullable(
    entityType: string,
    entityId: string,
    field: string,
    sourceValue: string | null | undefined,
  ): LocalizedField | null {
    const translation = this.lookupTranslation(entityType, entityId, field);

    if (sourceValue === null || sourceValue === undefined) {
      if (translation === null) {
        return null;
      }
      // Source is empty but a translation exists — keep the source slot present
      // (empty) so the field shape stays consistent.
      return new LocalizedField('', translation);
    }

    return new LocalizedField(sourceValue, translation);
  }
}
