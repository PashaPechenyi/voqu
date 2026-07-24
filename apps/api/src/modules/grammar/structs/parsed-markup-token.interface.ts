/**
 * The `parsedMarkup` token grammar (§1.4). A parsed markup string is an
 * ordered array of these discriminated tokens; the discriminator is always
 * `type`.
 */
export interface StaticToken {
  type: 'static';
  text: string;
}

export interface OptionsToken {
  type: 'options';
  options: string[];
}

export interface SlotToken {
  type: 'slot';
  slot: string;
}

export interface OptionalToken {
  type: 'optional';
  tokens: ParsedMarkupToken[];
}

export type ParsedMarkupToken = StaticToken | OptionsToken | SlotToken | OptionalToken;
