import { BadRequestException, Injectable } from '@nestjs/common';
import {
  OptionalToken,
  OptionsToken,
  ParsedMarkupToken,
  SlotToken,
  StaticToken,
} from '../structs/parsed-markup-token.interface';

/**
 * Parses a pattern markup string into the structured `parsedMarkup` token
 * array (§1.4). Regenerated from `markup` on every write — never authored
 * directly.
 *
 * Markup grammar (whitespace-delimited word groups):
 *   - `[X]`      → slot token   `{ type: 'slot', slot: 'X' }`
 *   - `(...)`    → optional group, recursively parsed (may nest)
 *   - `A/B/C`    → options token `{ type: 'options', options: ['A','B','C'] }`
 *   - anything else → static text; consecutive statics merge into one token
 *
 * Example: `I/We/They want [V1] (to him/her/them)` →
 *   [ options[I,We,They], static "want", slot V1,
 *     optional[ static "to", options[him,her,them] ] ]
 */
@Injectable()
export class PatternParserService {
  parse(markup: string): ParsedMarkupToken[] {
    const { tokens, nextIndex } = this.parseTokens(markup, 0, false);
    if (nextIndex < markup.length) {
      // A stray ')' with no matching '(' lands here.
      throw new BadRequestException(
        `Unexpected "${markup[nextIndex]}" at position ${nextIndex} in markup`,
      );
    }
    return tokens;
  }

  /**
   * Parses tokens starting at `start`. When `insideOptional` is true, parsing
   * stops (and returns) at the matching ')'; otherwise it runs to end-of-string.
   */
  private parseTokens(
    markup: string,
    start: number,
    insideOptional: boolean,
  ): { tokens: ParsedMarkupToken[]; nextIndex: number } {
    const tokens: ParsedMarkupToken[] = [];
    let i = start;
    let staticBuffer: string[] = [];

    const flushStatic = () => {
      if (staticBuffer.length) {
        const text = staticBuffer.join(' ');
        tokens.push({ type: 'static', text } as StaticToken);
        staticBuffer = [];
      }
    };

    while (i < markup.length) {
      const char = markup[i];

      if (char === ' ' || char === '\t' || char === '\n') {
        i++;
        continue;
      }

      if (char === ')') {
        if (!insideOptional) {
          break; // handled as an error by the caller (unbalanced ')')
        }
        flushStatic();
        return { tokens, nextIndex: i + 1 };
      }

      if (char === '(') {
        flushStatic();
        // Recurses; throws 'Unbalanced "("' if no matching ')' before EOS.
        const inner = this.parseTokens(markup, i + 1, true);
        tokens.push({ type: 'optional', tokens: inner.tokens } as OptionalToken);
        i = inner.nextIndex;
        continue;
      }

      if (char === '[') {
        flushStatic();
        const end = markup.indexOf(']', i + 1);
        if (end === -1) {
          throw new BadRequestException(`Unbalanced "[" in markup near position ${i}`);
        }
        const slot = markup.slice(i + 1, end).trim();
        if (!slot) {
          throw new BadRequestException(`Empty slot "[]" in markup near position ${i}`);
        }
        tokens.push({ type: 'slot', slot } as SlotToken);
        i = end + 1;
        continue;
      }

      // Read a whitespace/delimiter-bounded word.
      const wordStart = i;
      while (i < markup.length && !' \t\n()['.includes(markup[i])) {
        i++;
      }
      const word = markup.slice(wordStart, i);

      if (word.includes('/')) {
        flushStatic();
        const options = word.split('/').filter((opt) => opt.length > 0);
        tokens.push({ type: 'options', options } as OptionsToken);
      } else {
        staticBuffer.push(word);
      }
    }

    if (insideOptional) {
      throw new BadRequestException('Unbalanced "(" in markup: missing ")"');
    }

    flushStatic();
    return { tokens, nextIndex: i };
  }
}
