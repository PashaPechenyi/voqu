/**
 * Every SegmentKind key across all segment types. Each value is a seeded
 * `SegmentKind.key`: the template handler registers under it and the frontend
 * sends it as the `SegmentKindKey`. Keys are globally unique, so one flat
 * enum covers every type. Adding a kind = one new member here + one seed row +
 * one handler.
 */
export enum SegmentKindCode {
  // vocabulary
  Wordlist = 'wordlist',

  // grammar
  Topic = 'topic',
}
