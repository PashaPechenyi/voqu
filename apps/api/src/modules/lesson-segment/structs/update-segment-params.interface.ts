export interface IUpdateSegmentParams {
  title?: string | null;
  description?: string | null;
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
