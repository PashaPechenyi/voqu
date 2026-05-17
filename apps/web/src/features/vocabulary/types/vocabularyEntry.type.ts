// TODO: `tr_word` / `tr_description` / `tr_example` use snake_case prefixes for the Ukrainian translation. Replace with a sub-object: `translations: { uk: { word, description, example } }` (or a `Record<Locale, ...>`) so the type scales when a new language is added.
// TODO: Field names like `tr_word` mix snake_case in a codebase that uses camelCase everywhere else.
export type VocabularyEntry = {
  id: number;
  word: string;
  description: string;
  example: string;
  tr_word: string;
  tr_description: string;
  tr_example: string;
};
