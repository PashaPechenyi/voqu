/**
 * Inputs for the standalone wordlist-entry authoring endpoints
 * (add / update an entry, example, collocation).
 */
export interface ICreateEntryParams {
  WordlistId: string;
  lemma: string;
  entryType?: string;
  partOfSpeech?: string | null;
  v2?: string | null;
  v3?: string | null;
  transcription?: string | null;
  audioUrl?: string | null;
  note?: string | null;
  order?: number;
}

export interface IUpdateEntryParams {
  lemma?: string;
  entryType?: string;
  partOfSpeech?: string | null;
  v2?: string | null;
  v3?: string | null;
  transcription?: string | null;
  audioUrl?: string | null;
  note?: string | null;
  order?: number;
}

export interface ICreateExampleParams {
  text: string;
  order?: number;
}

export interface ICreateCollocationParams {
  expression: string;
  explanation?: string | null;
  order?: number;
}
