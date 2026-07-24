import { Injectable } from '@nestjs/common';

/**
 * Minimal allowlist HTML sanitizer for GrammarBlockText.text (§1.4). Runs on
 * every write. Plain prose passes through untouched; descriptions may use a
 * small allowlist of tags for emphasis. Anything not on the allowlist is
 * stripped (tag removed, inner text kept). No external dependency.
 *
 * This is intentionally conservative: it removes any tag not in the allowlist
 * and strips all attributes except a safe `href` on `<a>`. It is not a
 * full HTML5 parser — it's a defensive filter for author-entered rich text.
 */
@Injectable()
export class HtmlSanitizerService {
  private static readonly ALLOWED_TAGS = new Set([
    'b',
    'i',
    'u',
    'em',
    'strong',
    'code',
    'br',
    'p',
    'ul',
    'ol',
    'li',
    'a',
  ]);

  // Tags that never carry a closing tag.
  private static readonly VOID_TAGS = new Set(['br']);

  private static readonly SAFE_HREF_SCHEME = /^(https?:|mailto:|\/|#)/i;

  private static readonly TAG_RE = /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:[^<>"']|"[^"]*"|'[^']*')*)\/?>/g;

  sanitize(input: string): string {
    if (!input) {
      return input;
    }

    // Drop HTML comments (including conditional comments) entirely before any
    // tag processing — they are never allowed content.
    let output = input.replace(/<!--[\s\S]*?-->/g, '');

    // Run the tag-strip pass to a fixpoint. A single pass is not enough: a
    // split tag like `<scr<script>ipt>` has its inner `<script>` removed but
    // its outer fragments recombine into a live `<script>` in the output.
    // Repeating until the string stops changing collapses these tricks.
    // The loop always terminates because every pass that changes the string
    // strips at least one `<`/`>`, so length is strictly non-increasing and
    // bounded below.
    for (let i = 0; i < 20; i++) {
      const next = this.stripTagsOnce(output);
      if (next === output) {
        break;
      }
      output = next;
    }

    return output;
  }

  private stripTagsOnce(input: string): string {
    HtmlSanitizerService.TAG_RE.lastIndex = 0;
    return input.replace(
      HtmlSanitizerService.TAG_RE,
      (match, rawName: string, rawAttrs: string) => {
        const name = rawName.toLowerCase();

        if (!HtmlSanitizerService.ALLOWED_TAGS.has(name)) {
          // Strip the tag entirely; its text content (outside the tag) is kept.
          return '';
        }

        const isClosing = match.startsWith('</');
        if (isClosing) {
          return `</${name}>`;
        }

        if (name === 'a') {
          const href = this.extractSafeHref(rawAttrs);
          return href ? `<a href="${href}">` : '<a>';
        }

        if (HtmlSanitizerService.VOID_TAGS.has(name)) {
          return `<${name}>`;
        }

        // Allowed tag, all attributes dropped.
        return `<${name}>`;
      },
    );
  }

  private extractSafeHref(rawAttrs: string): string | null {
    const match = /href\s*=\s*("([^"]*)"|'([^']*)')/i.exec(rawAttrs);
    if (!match) {
      return null;
    }
    const value = (match[2] ?? match[3] ?? '').trim();
    if (!HtmlSanitizerService.SAFE_HREF_SCHEME.test(value)) {
      return null;
    }
    // Escape quotes/angle brackets in the URL to keep the attribute
    // well-formed. `&` is only escaped when it isn't already the start of an
    // entity, so re-running sanitize() on already-sanitized output is
    // idempotent (the fixpoint loop re-processes `<a>` tags every pass).
    return value
      .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);)/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
