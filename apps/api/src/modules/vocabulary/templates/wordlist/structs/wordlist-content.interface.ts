import {
  ILocalizedInput,
  INullableLocalizedInput,
} from '../../../../localization/structs/localized-input.interface';

/**
 * The `content` payload the wordlist handler accepts when a `wordlist` segment
 * is created. Matches §7.2 of the design doc.
 *
 * Translatable fields carry `{ value, translation? }`: `value` is stored on the
 * entity column, `translation` (when the request has `?lang=`) becomes a
 * `Translation` row. The entry's `lemma` is special — its `value` is the
 * `WordlistEntry.lemma` column, but its `translation` is written under the
 * `definition` field (the entry's meaning), per the design doc.
 */
export interface IWordlistEntryExampleInput {
  /** value → WordlistEntryExample.text; translation → field 'text' */
  text: ILocalizedInput;
  order?: number;
}

export interface IWordlistEntryCollocationInput {
  expression: string;
  /** value → WordlistEntryCollocation.explanation; translation → field 'explanation' */
  explanation?: INullableLocalizedInput | null;
  order?: number;
}

export interface IWordlistEntryInput {
  /** value → WordlistEntry.lemma; translation → field 'definition' */
  lemma: ILocalizedInput;
  entryType?: string;
  partOfSpeech?: string | null;
  v2?: string | null;
  v3?: string | null;
  transcription?: string | null;
  audioUrl?: string | null;
  /** value → WordlistEntry.note; translation → field 'note' */
  note?: INullableLocalizedInput | null;
  order?: number;
  examples?: IWordlistEntryExampleInput[];
  collocations?: IWordlistEntryCollocationInput[];
}

export interface IWordlistContentInput {
  /** value → Wordlist.title; translation → field 'title' */
  title: ILocalizedInput;
  /** value → Wordlist.description; translation → field 'description' */
  description?: INullableLocalizedInput | null;
  /** set only for user-owned saved-words lists; NULL for lesson wordlists */
  OwnerUserId?: string | null;
  entries?: IWordlistEntryInput[];
}
