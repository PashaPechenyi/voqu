/**
 * A translatable field in a read response (Option A shape).
 *
 * `value` is ALWAYS the source-language text (the entity column) so the client
 * always has the original. `translation` is the requested-language string when
 * one exists, or `null` when it doesn't. The languages themselves are declared
 * once on the lesson (`sourceLanguage` / `translationLanguage`), not per field.
 */
export class LocalizedField {
  constructor(value: string, translation: string | null = null) {
    this.value = value;
    this.translation = translation;
  }

  value: string;

  translation: string | null;
}
