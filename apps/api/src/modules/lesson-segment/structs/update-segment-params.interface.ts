import {
  ILocalizedInput,
  INullableLocalizedInput,
} from '../../localization/structs/localized-input.interface';

export interface IUpdateSegmentParams {
  /**
   * The segment's heading. Required on replace — a full replace states the
   * title outright instead of inheriting the previous one. `value` goes on the
   * segment column, `translation` (when given with `?lang=`) becomes a
   * Translation row.
   */
  title: ILocalizedInput;
  /** Same, but the source value may be null — the column is nullable. */
  description: INullableLocalizedInput;
  order?: number;
  /**
   * The full content tree to replace the segment's existing content with (same
   * shape as create — no row ids, no `SegmentKindKey`; the kind is fixed by the
   * existing segment). Passed opaquely to `handler.createContent`.
   */
  content: unknown;
  /** translation language from `?lang=` (single slug); see create. */
  lang?: string;
}
