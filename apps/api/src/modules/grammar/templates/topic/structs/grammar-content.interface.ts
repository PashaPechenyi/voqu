import {
  ILocalizedInput,
  INullableLocalizedInput,
} from '../../../../localization/structs/localized-input.interface';

/**
 * Content payload the grammar handler accepts when a `topic` segment is
 * created. The topic may be created empty (title/tense optional) and have
 * blocks added later, or come with an initial ordered list of blocks.
 *
 * Translatable fields carry `{ value, translation? }`: topic `title` and text
 * block `text`. Both the source `value` and the `translation` are HTML-
 * sanitized on write. `tense`, `form`, and `markup` are not translated here.
 */
export interface IGrammarTextBlockInput {
  blockType: 'text';
  textRole: string;
  /** value → GrammarBlockText.text (sanitized); translation → field 'text' */
  text: ILocalizedInput;
  order?: number;
}

export interface IGrammarPatternBlockInput {
  blockType: 'pattern';
  form: string;
  /** author markup; parsedMarkup is generated from it */
  markup: string;
  order?: number;
}

export type IGrammarBlockInput = IGrammarTextBlockInput | IGrammarPatternBlockInput;

export interface IGrammarContentInput {
  /** value → GrammarTopic.title; translation → field 'title' */
  title?: INullableLocalizedInput | null;
  tense?: string | null;
  blocks?: IGrammarBlockInput[];
}
