/**
 * Logical entity types used as the `Translation.entityType` discriminator.
 * Stored as VARCHAR — adding a new translatable surface is a new value here,
 * never a schema change.
 */
export enum TranslatableEntityType {
  Lesson = 'lesson',
  LessonSegment = 'lesson_segment',
  SegmentType = 'segment_type',
  SegmentKind = 'segment_kind',
  Wordlist = 'wordlist',
  WordlistEntry = 'wordlist_entry',
  WordlistEntryExample = 'wordlist_entry_example',
  WordlistEntryCollocation = 'wordlist_entry_collocation',
  GrammarTopic = 'grammar_topic',
  GrammarBlockText = 'grammar_block_text',
  GrammarBlockPattern = 'grammar_block_pattern',
}
