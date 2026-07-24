/**
 * Builds the ordered list of *translation* languages to try for a request,
 * most-preferred first. The source language is handled separately by the
 * resolver (it comes from the entity column, never from a Translation row), so
 * it is excluded here.
 *
 * Resolution order:
 *   1. The requested language.
 *   2. Its regional base (e.g. `pt-BR` → `pt`, `uk-UA` → `uk`).
 *
 * Duplicates are removed (first-seen order); the source language is dropped if
 * it appears (requesting the source language just means "return source text").
 */
export function buildLanguageChain(
  requestedLang: string | undefined,
  sourceLanguage: string,
): string[] {
  const chain: string[] = [];
  const seen = new Set<string>();

  const add = (code: string | undefined) => {
    const normalized = code?.trim();
    if (!normalized || normalized === sourceLanguage || seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    chain.push(normalized);
  };

  if (requestedLang) {
    add(requestedLang);
    add(requestedLang.split('-')[0]);
  }

  return chain;
}
