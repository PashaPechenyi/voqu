/**
 * Service-side shape of a translatable field in a create payload: the
 * source-language `value` plus an optional `translation` in the request's
 * `?lang=` language. The DTO `LocalizedInputDto` implements this.
 */
export interface ILocalizedInput {
  value: string;
  translation?: string;
}

/** Same, for fields whose source column is nullable. */
export interface INullableLocalizedInput {
  value?: string | null;
  translation?: string;
}
