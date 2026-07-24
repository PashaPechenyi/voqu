export interface ICreateSegmentParams {
  LessonId: string;
  /**
   * The SegmentKind's stable `code` key (e.g. `'wordlist'`,
   * `'topic'`) — not the DB id. The frontend holds these as constants,
   * so it sends the key; the service resolves it to the kind + handler.
   */
  SegmentKindKey: string;
  title?: string;
  description?: string;
  order?: number;
  /**
   * Template-specific content payload. Its shape is defined by the handler for
   * the chosen SegmentKind (e.g. a wordlist with entries, or a grammar topic).
   * The service passes it opaquely to `handler.createContent`.
   */
  content: unknown;
  /**
   * The translation language from `?lang=` (single slug). When present, the
   * handler writes a `Translation` row for each translated field in `content`.
   * Validated by the service against the lesson's course translation languages.
   */
  lang?: string;
}
