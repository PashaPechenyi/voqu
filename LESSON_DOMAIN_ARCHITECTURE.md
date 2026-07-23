# Lesson Domain Architecture

> Voqu — English learning platform. This document specifies the lesson domain: its entities, schema, extensibility model, localization strategy, API shape, and an implementation roadmap.

---

## Context

The platform already has Courses (entity, module, admin pages). The next step is the lesson system: each course contains lessons, and each lesson is composed of typed content blocks (segments) such as Vocabulary and Grammar. Future segment types (Reading, Listening, Speaking, Writing) will follow, and each segment type may host one or more **kinds** (templates) — for example today's Vocabulary segment has the Wordlist kind, and the Grammar segment has a single, flexible Topic kind whose content is a free-form ordered list of typed blocks (title, tense, description, sentence pattern, example).

The design has three hard constraints:

1. **Extensibility without major refactoring** — adding a new segment type or template should be additive (new tables + register the type), never a schema migration of existing data.
2. **Localization at the content level, not the entity level** — translations must support unlimited languages, partial coverage, AI-generated content, and provenance tracking. Adding a new UI language must not require a schema change.
3. **Future features the schema must enable cheaply** — cross-lesson vocabulary training, user saved-words list, exercises (quizzes / flashcards / matching), spaced repetition, and progress tracking.

The design must not block these; it must not pre-build them either.

---

## 1. Recommended Architecture

### 1.1 Composition

```
Course
 └── Lesson (ordered)
      └── LessonSegment (ordered; SegmentKind picks the content shape)
           └── exactly one content row per segment, in the table chosen by the kind
                 ├── Wordlist        (kind: wordlist)
                 │     └── WordlistEntry ─< WordlistEntryExample / WordlistEntryCollocation
                 └── GrammarTopic    (kind: topic)
                       │  ↑ holds title + tense directly (0..1 each, unordered)
                       └── GrammarBlock (ordered; blockType = 'text' | 'pattern')
                             ├── GrammarBlockText    (textRole = 'description' | 'example')
                             └── GrammarBlockPattern (form, markup, parsedMarkup)
```

A **Lesson** is a thin container: id, title, description, order, status, FK to Course.

A **LessonSegment** is the content block. It carries:

- `SegmentKindId` — FK to `SegmentKind`, the catalog row that defines both the segment type and the concrete content shape (e.g. `wordlist`, `topic`)
- `SegmentContentRowId` — UUID of the concrete row in the template-specific table (e.g. a `Wordlist.id`)
- `order` within the lesson, optional `title`/`description`

`SegmentKind` is a small lookup table seeded from code on app startup. The runtime **template handler registry** maps each `SegmentKind.code` (e.g. `'wordlist'`) to its repository and response-constructor. Adding a new template = new entity + migration + seed one `SegmentKind` row + register one handler. No changes to LessonSegment.

This makes the DB the source of truth for what segment types and templates exist — the admin UI populates its dropdowns from `GET /segment-kind` rather than hardcoding the list.

### 1.2 Why segment + concrete template rows (not JSONB)

Storing template data in a JSONB blob on LessonSegment would be faster to add types, but it blocks the things explicitly listed as future features:

- **Listing all entries the user has seen** is `SELECT * FROM "WordlistEntry" WHERE WordlistId IN (...)`. With JSONB, every read parses every wordlist.
- **User saved-words** needs FK targets and rows the renderer can join to. JSONB has neither.
- **Search by lemma** ("find lessons containing the word _resilient_") is `SELECT * FROM "WordlistEntry" WHERE lower(lemma) = 'resilient'` — cheap with an index, awkward with JSONB.
- **Validation** is enforced by the schema, not by application code.

The cost of the typed approach is one extra table per template. That cost is bounded and one-time per template.

### 1.3 Vocabulary: self-contained wordlist entries, no global lexicon

A `Wordlist` has many `WordlistEntry` rows. **Each entry is fully self-contained**: it carries the lemma, the part of speech, verb forms, transcription, audio URL, and a per-entry note directly. Two different admins teaching `plan` produce two completely independent `WordlistEntry` rows. There is no global `Word` table; there is no dedup; there is no shared lexicon.

The trade-off is deliberate. We accept that the same word taught in 10 courses produces 10 separate translations in exchange for:

- **Simple authoring.** Adding an entry is just filling in a form on the wordlist — no autocomplete against a global pool, no "this word already exists, link to it?" dialog, no decisions about whether your _plan_ is the same _plan_ as someone else's.
- **Simple ownership.** Editing a wordlist only ever affects that wordlist. Two admins can't collide on the same word.
- **Simple data model.** One table per concept (entry, example, collocation), all keyed by the entry id. Translations key off `('wordlist_entry', WordlistEntryId, field, lang)`.
- **No homograph problem.** "_plan_ the noun" and "_plan_ the verb" are just two separate entries, the same way _bat (animal)_ and _bat (sports)_ are two separate entries — each with its own definition, examples, translations. Authors don't have to disambiguate at the lexicon level.

An entry can be **a single word** (`entryType='word'`, e.g. `plan`) **or a multi-word phrase** (`entryType='phrase'`, e.g. `get confused about` / `a round trip ticket`). The discriminator drives admin-UI affordances (hide verb-form fields on phrases, show a "phrase" tag instead of a POS chip). `partOfSpeech` is nullable: words usually set it; phrases set it only when there's a clear head ("get confused about" → `verb`).

**User saved-words** reuses the same shape: a saved-words list **is** a `Wordlist` with `OwnerUserId` set to the user. Saving a word from a lesson copies the entry into the user's wordlist; saving a custom word the user typed in creates a fresh entry in the user's wordlist. The user's "My Words" page is just a wordlist renderer with one extra filter. No second table, no parallel infrastructure.

### 1.4 Grammar: one flexible kind, two-layer block typing

There is exactly one grammar kind: `topic`. Its content row is a `GrammarTopic` that carries the two fixed topic-level attributes:

- **`title`** — 0..1, the topic's heading (e.g. "want + object + to V1").
- **`tense`** — 0..1, free-string metadata (e.g. "Present Simple").

Everything else lives as ordered `GrammarBlock` rows under the topic. Each block is typed at two layers:

- **`GrammarBlock.blockType`** — _structural_. One of `'text'` or `'pattern'`. Tells you which payload table to join (`text` → `GrammarBlockText`, `pattern` → `GrammarBlockPattern`). The values map 1:1 to payload table names.
- **`GrammarBlockText.textRole`** — _semantic_. One of `'description'` or `'example'`. Lives on the text payload, where it belongs — it labels what kind of text this is so the UI can style it (description prose vs italic example with a badge). Pattern blocks don't have a role; their `form` label plays an analogous part.

`GrammarBlockText.text` is **always sanitized HTML** in the source language. Plain prose like `"I want you to come."` passes through untouched and renders as plain prose; descriptions can mix in a small allowlist of tags (`b`, `i`, `u`, `em`, `strong`, `code`, `br`, `p`, `ul`/`ol`/`li`, `a`) for emphasis. No format discriminator: one rendering path, one sanitizer running on every write, and the renderer trusts the stored value without re-escaping. If Markdown is ever wanted as an _input_ format for authors, the converter runs at write-time and stores HTML — the storage shape doesn't change.

`GrammarBlockPattern` holds an editable **markup string**, a cached **`parsedMarkup`** (the markup broken into structured tokens), and a free-form `form` label (affirmative / negative / question / formal / US / …).

The markup grammar is small:

```
I/We/They want [V1] (to him/her/them)
^^^^^^^^^^^^ ^^^^ ^^^^ ^^^^^^^^^^^^^^^^^^
options      static slot optional
```

On write, the server parses the markup and caches the structured form as JSONB in the `parsedMarkup` column on the same row. Clients render from `parsedMarkup`; authors edit `markup`. Re-parsing is cheap and re-runs on every update — `parsedMarkup` is never authored directly, it's always regenerated from `markup`.

**Token grammar** — `parsedMarkup` is a JSON array of tokens. Each token is one of four discriminated objects:

```jsonc
// Static text the user must say verbatim
{ "type": "static", "text": "want" }

// User picks one alternative from the list
{ "type": "options", "options": ["I", "We", "They"] }

// A grammar slot the user fills (V1, V2, noun, adjective, …)
{ "type": "slot", "slot": "V1" }

// An optional group — may be omitted entirely.
// If included, it contains its own ordered list of tokens (any type, including nested optionals).
{ "type": "optional", "tokens": [ /* …tokens… */ ] }
```

So the markup `I/We/They want [V1] (to him/her/them)` becomes:

```jsonc
[
  { "type": "options", "options": ["I", "We", "They"] },
  { "type": "static", "text": "want" },
  { "type": "slot", "slot": "V1" },
  {
    "type": "optional",
    "tokens": [
      { "type": "static", "text": "to" },
      { "type": "options", "options": ["him", "her", "them"] },
    ],
  },
]
```

The top level is just the array — no wrapping object. The discriminator is always `type`. Payload keys are named to match the type (`text` for `static`, `options` for `options`, `slot` for `slot`, `tokens` for `optional`'s nested list) so each token is self-describing.

**Why a single kind with flexible blocks instead of fixed kinds (Sentence Pattern / Small Word):**

- Real grammar lessons mix sections freely — a _Small Word_ lesson on `about to` usually has a description, examples, _and_ one or two sentence patterns; a _Sentence Pattern_ lesson often has only one pattern with several examples. Two fixed kinds force authors to pick the closest fit and then bend the schema to fit reality.
- Pattern _variants_ (affirmative / negative / question / formal / US / …) become sibling `pattern` blocks, each with its own `form` label. Order, count, and labeling are uniform with other blocks.
- Adding a new structural block type later (e.g. `image`, `table`) is one new `blockType` value + one new payload table named to match (`GrammarBlockImage`, `GrammarBlockTable`). Adding a new text role (e.g. `note`, `tip`) is one new value in `GrammarBlockText.textRole`'s CHECK — no schema change.

---

## 2. Database Design

### 2.1 Naming conventions (project rules)

- Table names: singular `PascalCase` quoted identifiers (`"Lesson"`, `"Wordlist"`).
- FK column names: `PascalCase` ending in `Id` (`LessonId`, `WordlistId`).
- Primary keys: `id UUID DEFAULT gen_random_uuid()`.
- Timestamps: `createdAt`, `updatedAt` as `TIMESTAMP WITH TIME ZONE`.
- Cascade deletes top-down: deleting a Course removes its Lessons, etc.

**Prefix convention for segment-kind content tables:**

- Each segment kind owns a small family of tables. All tables in one family share a common prefix that names the family, so unrelated tables can't be confused at a glance.
- **Grammar family** uses the `Grammar*` prefix on every table: `GrammarTopic`, `GrammarBlock`, `GrammarBlockText`, `GrammarBlockPattern`. The prefix is needed because the child nouns (`Block`, `Topic`) are generic and would collide with future content models.
- **Vocabulary family** nests under the `Wordlist*` prefix: `Wordlist`, `WordlistEntry`, `WordlistEntryExample`, `WordlistEntryCollocation`. The root noun (`Wordlist`) is already specific enough to serve as the prefix; no extra `Vocabulary*` layer is added.
- When adding a new segment kind, pick one prefix (the kind's name or its content root) and apply it to every table in that kind's family.

### 2.2 Enums

Enums live in `apps/api/src/modules/<module>/structs/*.enum.ts` and are stored as `VARCHAR(N)` columns (matches existing `CourseStatus` pattern), not Postgres ENUM types — easier to extend without migrations.

What lives **in code** (genuinely fixed sets — the system breaks if you add a value without a code change):

```ts
export enum LessonStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum PartOfSpeech {
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
  Adverb = 'adverb',
  Preposition = 'preposition',
  Pronoun = 'pronoun',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
}
// Note: no 'phrase' value here — multi-word entries use `WordlistEntry.entryType = 'phrase'`
// and may still carry a real POS ('verb' / 'noun' / …) or leave it NULL.
```

What lives **in the DB** (extensible without a code change, surfaced to admin UI):

- `SegmentType` — `vocabulary`, `grammar`, … (one row per type)
- `SegmentKind` — `wordlist`, `topic`, … (one row per concrete content shape, FK to `SegmentType`)
- `GrammarBlock.blockType` — structural discriminator; CHECK constraint on `('text', 'pattern')`. Add a new structural type by adding the value + creating a payload table.
- `GrammarBlockText.textRole` — semantic label; CHECK constraint on `('description', 'example')`. Add a new role with a one-line CHECK migration.
- `WordlistEntry.entryType` — `'word'` \| `'phrase'`; CHECK constraint. Drives admin-UI affordances and supports queries like "list all phrases".
- `GrammarBlockPattern.form` — free string (affirmative / negative / question / formal / US / …). No enum.

What's **dropped** from the previous draft:

- ~~`TranslationSource`~~ — translations are admin-written/approved by definition; provenance column is noise.
- ~~`grammar.sentence_pattern` kind, `grammar.small_word` kind~~ — replaced by the single, flexible `topic` kind whose content is an ordered list of typed blocks.
- ~~`GrammarSentencePattern`, `SentencePatternVariant`, `GrammarSmallWord`, `SmallWordEntry`, `SmallWordVariant`, `GrammarExample`~~ tables — replaced by `GrammarTopic`, `GrammarBlock`, `GrammarBlockText`, `GrammarBlockPattern`.
- ~~Global `Word` table~~ — collapsed into `WordlistEntry`. Each wordlist owns its entries directly; no shared lexicon, no `findOrCreate`, no cross-list dedup. Trade-off: simpler authoring at the cost of duplicated translations across courses that teach the same word. `WordExample` and `WordCollocation` likewise renamed to `WordlistEntryExample` and `WordlistEntryCollocation` and re-keyed to the entry.

### 2.3 Tables

**Lesson** — already exists; no schema change needed. Confirms shape:

| column                | type                        | notes                                                   |
| --------------------- | --------------------------- | ------------------------------------------------------- |
| id                    | uuid pk                     |                                                         |
| CourseId              | uuid fk → Course            | ON DELETE CASCADE                                       |
| title                 | varchar(255)                | source language only; translations in Translation table |
| subtitle              | varchar(255) nullable       |                                                         |
| description           | text nullable               |                                                         |
| order                 | int default 0               |                                                         |
| status                | varchar(20) default 'draft' | LessonStatus                                            |
| createdAt / updatedAt | timestamptz                 |                                                         |

Index: `(CourseId, order)`.

**SegmentType** — new (lookup, seeded from code)

| column                | type                 | notes                                                            |
| --------------------- | -------------------- | ---------------------------------------------------------------- |
| id                    | uuid pk              |                                                                  |
| code                  | varchar(32) unique   | `'vocabulary'`, `'grammar'`, …                                   |
| name                  | varchar(64)          | display label (source language) — translatable via `Translation` |
| isActive              | boolean default true | hide deprecated types without deleting                           |
| createdAt / updatedAt | timestamptz          |                                                                  |

**SegmentKind** — new (lookup, seeded from code)

| column                | type                  | notes                                                                                                |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| id                    | uuid pk               |                                                                                                      |
| SegmentTypeId         | uuid fk → SegmentType | CASCADE                                                                                              |
| code                  | varchar(64) unique    | `'wordlist'`, `'topic'`, …                                                                           |
| name                  | varchar(64)           | display label — translatable                                                                         |
| tableName             | varchar(64)           | which template-specific table holds the row (e.g. `'Wordlist'`) — used by audit/orphan-check tooling |
| isActive              | boolean default true  |                                                                                                      |
| createdAt / updatedAt | timestamptz           |                                                                                                      |

Unique: `code`. Both tables are seeded on startup from a code-side `SEGMENT_KIND_REGISTRY` list; the seeder upserts by `code` so rows are stable across deploys.

> No `order` column on either catalog table. The set is small and the frontend can sort however it wants (alphabetical, usage frequency, recently used) using data it already has. Add the column if a stable server-side order becomes load-bearing.

**LessonSegment** — new

| column                | type                  | notes                                                                                                                                                                                                                                                                                                                        |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | uuid pk               |                                                                                                                                                                                                                                                                                                                              |
| LessonId              | uuid fk → Lesson      | CASCADE                                                                                                                                                                                                                                                                                                                      |
| SegmentKindId         | uuid fk → SegmentKind | RESTRICT (can't delete a template that's in use)                                                                                                                                                                                                                                                                             |
| SegmentContentRowId   | uuid                  | id of the row in the template-specific table named by `SegmentKind.tableName`                                                                                                                                                                                                                                                |
| title                 | varchar(255) nullable | optional lesson-side title shown above the segment content (e.g. "How to ask people to do things" for a grammar topic). Doesn't override the content row's own `title` (when the content has one — e.g. `Wordlist.title`, `GrammarTopic.title`); both can be shown together or the renderer can choose which one to display. |
| description           | text nullable         |                                                                                                                                                                                                                                                                                                                              |
| order                 | int default 0         |                                                                                                                                                                                                                                                                                                                              |
| createdAt / updatedAt | timestamptz           |                                                                                                                                                                                                                                                                                                                              |

Indexes: `(LessonId, order)`, `(SegmentKindId, SegmentContentRowId)` for reverse lookup ("where is this wordlist used?").

> Note on `SegmentContentRowId`: Postgres doesn't support polymorphic FKs, so this column is FK-by-convention, not by constraint. Integrity is enforced by `LessonSegmentService.create()` which inserts the template row and segment row in one transaction, and by a periodic orphan-check job that joins on `SegmentKind.tableName`.

**Wordlist** — content row for a `wordlist` segment, **or** a user's personal saved-words list.

| column                | type                    | notes                                                                                                                                                                                                                               |
| --------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | uuid pk                 | referenced by `LessonSegment.SegmentContentRowId` when used as lesson content                                                                                                                                                       |
| title                 | varchar(255)            |                                                                                                                                                                                                                                     |
| description           | text nullable           |                                                                                                                                                                                                                                     |
| OwnerUserId           | uuid fk → User nullable | `NULL` for lesson wordlists (created by an admin, attached to a `LessonSegment`). Non-`NULL` for user-owned wordlists (the user's "My Words" / saved-words list). A user-owned wordlist is never referenced by any `LessonSegment`. |
| createdAt / updatedAt | timestamptz             |                                                                                                                                                                                                                                     |

Index: `(OwnerUserId)` for "list my wordlists" queries.

> A user has at most one implicit "My Words" wordlist (created on first save) but the schema doesn't enforce that — they could have multiple personal lists ("travel vocab", "work vocab") if the product wants to expose that later. No schema change required.

**WordlistEntry** — every entry is self-contained. All lexical metadata lives here directly; there is no global `Word` table.

| column                | type                        | notes                                                                                                                                                                    |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                    | uuid pk                     |                                                                                                                                                                          |
| WordlistId            | uuid fk → Wordlist          | CASCADE                                                                                                                                                                  |
| lemma                 | varchar(255)                | source language. For `entryType='word'`, the canonical headword (e.g. `plan`). For `entryType='phrase'`, the full phrase string (e.g. `get confused about`).             |
| entryType             | varchar(8) default `'word'` | `'word'` \| `'phrase'`. DB-level `CHECK` constraint enforces the set. Drives admin-UI affordances (which fields to show) and lets queries filter ("train only phrases"). |
| partOfSpeech          | varchar(32) nullable        | `PartOfSpeech` enum. Usually set for words. For phrases, set it only when there's a clear head ("get confused about" → `verb`); otherwise `NULL`.                        |
| v2                    | varchar(255) nullable       | verb past simple — usually `NULL` for phrases                                                                                                                            |
| v3                    | varchar(255) nullable       | verb past participle — usually `NULL` for phrases                                                                                                                        |
| transcription         | varchar(255) nullable       | IPA                                                                                                                                                                      |
| audioUrl              | varchar(512) nullable       | future use, nullable now                                                                                                                                                 |
| order                 | int default 0               | display order within the wordlist                                                                                                                                        |
| note                  | text nullable               | author note, source language; translatable via `('wordlist_entry', id, 'note', lang)`                                                                                    |
| createdAt / updatedAt | timestamptz                 |                                                                                                                                                                          |

Indexes: `(WordlistId, order)`, `lower(lemma)` for cross-lesson search. **No global uniqueness on lemma** — duplicates across wordlists are expected and fine. Optionally enforce `(WordlistId, lower(lemma), COALESCE(partOfSpeech,''), entryType)` to prevent the same admin adding the same word twice to the _same_ wordlist (likely a typo), but that's a soft guard, not a model invariant.

The entry's `definition` translation lives in `Translation` keyed by `('wordlist_entry', WordlistEntryId, 'definition', lang)`. There is no `definition` column on the entry itself because the source-language "definition" is just the lemma — translations are what define it for the user.

**WordlistEntryExample** — example sentences attached to one entry.

| column          | type                    | notes                                                                            |
| --------------- | ----------------------- | -------------------------------------------------------------------------------- |
| id              | uuid pk                 |                                                                                  |
| WordlistEntryId | uuid fk → WordlistEntry | CASCADE                                                                          |
| text            | text                    | source language; translatable via `('wordlist_entry_example', id, 'text', lang)` |
| order           | int default 0           |                                                                                  |

Index: `(WordlistEntryId, order)`.

**WordlistEntryCollocation** — collocations / common prepositions attached to one entry.

| column          | type                    | notes                                                                      |
| --------------- | ----------------------- | -------------------------------------------------------------------------- |
| id              | uuid pk                 |                                                                            |
| WordlistEntryId | uuid fk → WordlistEntry | CASCADE                                                                    |
| expression      | varchar(255)            | e.g. "friendly to"                                                         |
| explanation     | text nullable           | translatable via `('wordlist_entry_collocation', id, 'explanation', lang)` |
| order           | int default 0           |                                                                            |

Index: `(WordlistEntryId, order)`.

**GrammarTopic** — the content row for a `topic` segment. Carries the two fixed topic-level attributes; everything else lives in `GrammarBlock` rows beneath it.

| column                | type                  | notes                                                                                                                                 |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | uuid pk               | referenced by `LessonSegment.SegmentContentRowId` when the segment's kind is `topic`                                                  |
| title                 | varchar(255) nullable | source language; translatable via `('grammar_topic', id, 'title', lang)`                                                              |
| tense                 | varchar(64) nullable  | free string, e.g. 'Present Simple'; usually not translated but translatable via `('grammar_topic', id, 'tense', lang)` if ever needed |
| createdAt / updatedAt | timestamptz           |                                                                                                                                       |

**GrammarBlock** — ordered child of a topic. `blockType` is the **structural** discriminator that tells you which payload table holds the data.

| column                | type                   | notes                                                                                                                                                     |
| --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | uuid pk                |                                                                                                                                                           |
| GrammarTopicId        | uuid fk → GrammarTopic | CASCADE                                                                                                                                                   |
| blockType             | varchar(16)            | `'text'` \| `'pattern'`. DB-level `CHECK` constraint enforces the set. Values map 1:1 to payload table names (`GrammarBlockText`, `GrammarBlockPattern`). |
| order                 | int default 0          |                                                                                                                                                           |
| createdAt / updatedAt | timestamptz            |                                                                                                                                                           |

Index: `(GrammarTopicId, order)`. No cardinality constraints on `blockType` — a topic may hold 0..N of each kind of block.

**GrammarBlockText** — payload for `text` blocks.

| column         | type                       | notes                                                                                                                                                                                                                                                           |
| -------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GrammarBlockId | uuid pk, fk → GrammarBlock | CASCADE. 1:1 — pk _is_ the FK.                                                                                                                                                                                                                                  |
| textRole       | varchar(32)                | **semantic** label: `'description'` \| `'example'`. DB-level `CHECK` constraint enforces the set. The UI uses it to style the block (e.g. italics + "Example" badge for examples).                                                                              |
| text           | text                       | source language; always sanitized HTML on write (allowlisted tags only — `b`, `i`, `u`, `em`, `strong`, `code`, `br`, `p`, `ul`/`ol`/`li`, `a`). Plain prose passes through untouched. Translatable via `('grammar_block_text', GrammarBlockId, 'text', lang)`. |

**GrammarBlockPattern** — payload for `pattern` blocks.

| column         | type                       | notes                                                                                                                                    |
| -------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| GrammarBlockId | uuid pk, fk → GrammarBlock | CASCADE. 1:1 — pk _is_ the FK.                                                                                                           |
| form           | varchar(64)                | free-form label (`'affirmative'`, `'negative'`, `'question'`, `'formal'`, `'US'`, …); also translatable if ever needed                   |
| markup         | text                       | author-edited markup string                                                                                                              |
| parsedMarkup   | jsonb                      | the markup broken into structured tokens (see token grammar in §1.4); regenerated from `markup` on every write — never authored directly |

> Why 1:1 with `GrammarBlockId` as the pk? Each block has exactly one payload row, the payload lives or dies with the block, and the natural FK is the block id. Sharing the pk skips a redundant surrogate id and makes joins trivial (`LEFT JOIN GrammarBlockText USING (GrammarBlockId)`). Adding a new payload table for a future structural type follows the same pattern.

> Two layers of typing on purpose: `GrammarBlock.blockType` is structural (which payload table) and lives on the row everyone joins to first. `GrammarBlockText.textRole` is semantic (description vs example) and lives next to the data it labels. Pattern blocks have no role column; their `form` plays an analogous part.

### 2.4 Localization tables

Two small tables, used by every translatable field on every entity:

**Language**

| column     | type                 | notes                                  |
| ---------- | -------------------- | -------------------------------------- |
| code       | varchar(10) pk       | BCP 47, e.g. 'en', 'uk', 'es', 'pt-BR' |
| name       | varchar(64)          | display name                           |
| nativeName | varchar(64)          |                                        |
| isActive   | boolean default true |                                        |

**Translation** — single generic table for all translatable content

| column                | type                      | notes                                                                                                                                                                               |
| --------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | uuid pk                   |                                                                                                                                                                                     |
| entityType            | varchar(64)               | 'lesson', 'lesson_segment', 'wordlist', 'wordlist_entry', 'wordlist_entry_example', 'wordlist_entry_collocation', 'grammar_topic', 'grammar_block_text', 'grammar_block_pattern', … |
| EntityId              | uuid                      | row id in that entity's table                                                                                                                                                       |
| field                 | varchar(64)               | logical field name, e.g. 'definition', 'description', 'text'                                                                                                                        |
| languageCode          | varchar(10) fk → Language |                                                                                                                                                                                     |
| value                 | text                      | the translated text                                                                                                                                                                 |
| version               | int default 1             | bumped on edit; full history kept by `TranslationHistory` (future)                                                                                                                  |
| createdAt / updatedAt | timestamptz               |                                                                                                                                                                                     |

Unique: `(entityType, EntityId, field, languageCode)`. Index: `(entityType, EntityId)` for lookup.

> No `source` column. Every translation is written or approved by an admin, so provenance carries no read-time information. AI- or community-suggested translations live in a future `TranslationSuggestion` staging table (not part of this design); they only become rows in `Translation` once an admin approves them.

The contract: **source-language text lives on the entity column directly** (`WordlistEntry.lemma`, `WordlistEntryExample.text`, `Lesson.title`). Translations into _any other_ language live in `Translation`. This keeps the common path fast (no join for the source language) and unbounded for any extra language.

### 2.5 ERD summary

```
SegmentType (1) ─< SegmentKind ─┐
                                 │ (FK from LessonSegment)
                                 ▼
User (1) ─< Wordlist (OwnerUserId nullable; user-owned lists are never referenced by LessonSegment)

Course (1) ─< Lesson (1) ─< LessonSegment ─(polymorphic via SegmentKind.tableName)─►
                                              ├ Wordlist (OwnerUserId IS NULL when used as lesson content)
                                              │     └─< WordlistEntry ─< WordlistEntryExample
                                              │                       └─< WordlistEntryCollocation
                                              └ GrammarTopic (carries title + tense)
                                                  └─< GrammarBlock (blockType: text | pattern)
                                                        ├─ GrammarBlockText    (1:1, textRole: description | example)
                                                        └─ GrammarBlockPattern (1:1, form + markup + parsedMarkup)

Translation (entityType, EntityId, field, languageCode) — attaches to any text field above
```

---

## 3. Localization Strategy

### 3.1 Two distinct languages

- **Learning language** — the language the content teaches (English, for now). Stored as source text on entity columns.
- **UI / native language** — the user's preferred language (Ukrainian, Spanish, Polish, …). Stored only in the `Translation` table.

For now the source language is **English everywhere** — that's a global assumption, not a per-row column. If the platform ever introduces content authored in another source language, add a `sourceLanguageCode` column to `Course` or `Lesson` at that time (a one-line migration with default `'en'`). Not pre-built.

### 3.2 How translations are queried

Every translatable read path:

1. Fetch the entity rows with their source-language text.
2. Collect `(entityType, EntityId)` pairs that have translatable fields.
3. Single batched query against `Translation` filtered by `languageCode IN (requested, fallback1, fallback2)`.
4. The response constructor merges: prefer requested language, then fallback chain, finally source.

This keeps it to **two queries** regardless of lesson size: the content query and one translation batch.

### 3.3 Fallback chain

Resolve order per field:

1. Requested language (e.g. `uk`).
2. Regional fallback (e.g. `uk-UA` falls back to `uk`, `pt-BR` falls back to `pt`) — regional variants drop the region and try the base code.
3. Explicit fallback chain configured per user / per course (e.g. `[uk, en]`).
4. Source language on the entity column.

The response marks each field with `lang: 'uk' | 'en' | …` so the client can render a "shown in English (no Ukrainian translation yet)" badge.

### 3.4 Admin approval is implicit; AI / community suggestions are staged separately

The `Translation` table holds only approved content. AI- or community-generated text never lands there directly — it lives in a future `TranslationSuggestion` staging table that admins review and promote. From the read-path's perspective, every row in `Translation` is authoritative; no provenance column to interpret.

When AI assistance is added later, the flow is:

1. Admin clicks "Suggest translation" → AI fills `TranslationSuggestion`.
2. Admin reviews, edits if needed, clicks "Approve" → service writes/updates the corresponding `Translation` row and deletes the suggestion.

This keeps the hot path simple and the schema stable.

### 3.5 Example Translation rows

```sql
-- A wordlist entry's definition (the meaning of the entry in Ukrainian)
INSERT INTO "Translation" (entityType, "EntityId", field, "languageCode", value) VALUES
 ('wordlist_entry', 'entry-uuid-1', 'definition', 'uk', 'яблуко');

-- A wordlist entry's per-list note — same entityType + EntityId, different field
INSERT INTO "Translation" (entityType, "EntityId", field, "languageCode", value) VALUES
 ('wordlist_entry', 'entry-uuid-7', 'note', 'uk', 'Корисно у темі їжі');

-- A grammar example block's text
INSERT INTO "Translation" (entityType, "EntityId", field, "languageCode", value) VALUES
 ('grammar_block_text', 'block-uuid-42', 'text', 'uk', 'Я хочу, щоб ти прийшов.');
```

---

## 4. Recommended Approach (and why not the alternatives)

| Concern                         | Choice                                                                                                         | Why                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Segment type / template catalog | **DB-backed `SegmentType` + `SegmentKind` tables seeded from code**                                            | Admin UI populates dropdowns from DB; FK guarantees `LessonSegment` can only point to a registered template. Still requires code to add a real template, but the catalog is data.                                                                                                                                                    |
| Segment → template row binding  | **`LessonSegment.SegmentContentRowId` is FK-by-convention to the table named in `SegmentKind.tableName`**      | Postgres can't do polymorphic FKs. Integrity enforced by service transactions + reverse-lookup index + periodic orphan-check job.                                                                                                                                                                                                    |
| Vocabulary entries              | **Self-contained `WordlistEntry`; no global `Word` table; `entryType` distinguishes `'word'` from `'phrase'`** | Each entry owns its lemma, POS, verb forms, transcription, examples, collocations, and translations. Two admins teaching `plan` get two independent rows — no shared lexicon, no dedup, no cross-list authoring conflicts. Trade-off accepted: simpler authoring at the cost of duplicated translations across courses.              |
| User saved-words                | **A `Wordlist` with `OwnerUserId` set**                                                                        | User-owned wordlists reuse the entire wordlist infrastructure: same table, same renderer, same translations, same examples. No parallel `UserSavedWord` table. Saving from a lesson copies the entry into the user's wordlist; user-typed words become fresh entries.                                                                |
| Grammar segment shape           | **One `topic` kind: fixed `title`/`tense` on the topic + ordered, typed `GrammarBlock` children**              | Real grammar lessons mix descriptions, patterns, and examples in author-defined order and counts; `title` and `tense` are unordered metadata, not interleaved content. Two fixed kinds (sentence-pattern / small-word) forced the wrong taxonomy. One flexible kind absorbs both and any future grammar shape.                       |
| Block typing                    | **Two-layer: structural `blockType` on `GrammarBlock`, semantic `textRole` on `GrammarBlockText`**             | `blockType` (`'text'`/`'pattern'`) tells you which payload table to join — it's a structural concern and belongs on the row everyone joins to first. `textRole` (`'description'`/`'example'`) labels the _kind_ of text and belongs next to the text itself. Patterns don't carry a role; their `form` plays the analogous part.     |
| Block payloads                  | **Two 1:1 payload tables (`GrammarBlockText`, `GrammarBlockPattern`)**                                         | Cleanly separates simple-text blocks from markup-bearing pattern blocks. New structural types add a new payload table. Beats a JSONB blob (no FK, no translation hooks, no index) and beats wide nullable rows (messy with more types).                                                                                              |
| Rich text                       | **`GrammarBlockText.text` is always sanitized HTML, no discriminator column**                                  | Plain prose is valid HTML and passes through untouched; descriptions can mix in bold / italics / lists using a small allowlist. One rendering path, one sanitizer running on every write. No format column to misinterpret. If Markdown is ever wanted as an _input_ format, it converts to HTML on write — storage shape unchanged. |
| Pattern variant labels          | **Free-form `form` string on `GrammarBlockPattern`**                                                           | Author types whatever fits — affirmative/negative/question, formal/informal, US/UK, or none. No enum, no lookup.                                                                                                                                                                                                                     |
| Pattern tokens                  | **Markup string + cached `parsedMarkup` (JSONB token array)**                                                  | Authors edit a simple string; clients render the structured tokens without parsing on every read; the structure is always reproducible by re-parsing `markup`.                                                                                                                                                                       |
| Localization                    | **Generic `Translation` table, content fields only, no provenance column**                                     | One table covers every entity. Adding a language is one row in `Language`, zero migrations. Every row is admin-approved by definition, so no `source` to interpret.                                                                                                                                                                  |
| Grammar examples                | **Just `example` blocks** — sibling to other blocks, sharing the `GrammarBlockText` payload table              | No need for a polymorphic `GrammarExample (entityType, EntityId)` table; examples are first-class blocks like any other.                                                                                                                                                                                                             |
| Versioning                      | **Single canonical row + `version` column**                                                                    | Defer a full history table until needed; the column reserves the slot.                                                                                                                                                                                                                                                               |

What we deliberately do **not** do:

- No Postgres `ENUM` types — `VARCHAR` matches existing `CourseStatus` and avoids migrations to add values.
- No single-table inheritance for segments — nullable columns everywhere is the worst pattern for extensibility.
- No per-entity translation tables — multiplies boilerplate and forces a migration per new language scope.
- No deep `content` JSONB on LessonSegment — kills relational integrity and future querying.

---

## 5. Scalability Considerations

**Will become a problem if left alone:**

- **Translation table size.** Hundreds of entries × dozens of languages × a few fields each = millions of rows quickly. Mitigation: composite index `(entityType, EntityId)` is the primary lookup path; batched query per lesson keeps reads to one round-trip. Note: dropping the global `Word` model means translations are duplicated across courses teaching the same word — accepted trade-off for authoring simplicity.
- **Markup parser drift.** Authors will hit cases the parser doesn't handle. Mitigation: store the `markup` verbatim; `parsedMarkup` is always regenerable. Parser changes are safe to roll out by re-running the parse on existing rows.

**Abstract now (cheap to build, expensive to retrofit):**

- LessonSegment + template registry — this is the keystone.
- Generic Translation table — adding languages later without it requires schema migration.
- `Wordlist.OwnerUserId` — lets a user's saved-words list reuse the wordlist infrastructure without a parallel table.

**Defer (cheap to retrofit):**

- TranslationHistory table — `version` column reserves the slot; the history table is a future migration.
- Exercise tables (quizzes, flashcards, matching) — well-defined add-on once the content model is stable.
- SpacedRepetition / UserProgress tables — reference `WordlistEntry.id`, `Lesson.id`, `User.id`; no change to content schema.
- Lesson versioning — when needed, add `LessonVersion` referencing a snapshot of segments. Don't pre-build.

**Strict structure where it matters:**

- `Translation` uniqueness `(entityType, EntityId, field, languageCode)` — guarantees one canonical translation per slot.
- `WordlistEntry` has **no global lemma uniqueness** — duplicates across wordlists are expected. Optional soft guard: `(WordlistId, lower(lemma), COALESCE(partOfSpeech,''), entryType)` prevents the same admin adding the same word twice to the _same_ wordlist.

**Flexible where it matters:**

- `SegmentType` / `SegmentKind` as data — adding a new template is a seed row + handler, not a schema change.
- `Translation.entityType` and `field` as VARCHAR — new translatable surfaces add zero columns.
- `GrammarBlock.blockType` as VARCHAR + CHECK — new structural types add a CHECK migration + a payload table.
- `GrammarBlockText.textRole` as VARCHAR + CHECK — new text roles (e.g. `note`, `tip`) add a one-line CHECK migration only.
- `GrammarBlockPattern.form` as a free string — variant taxonomies vary by pattern.
- `parsedMarkup` as JSONB — evolves with the token grammar; adding a new token type (e.g. `link`, `inflection`) doesn't change the column.

---

## 6. API Design

### 6.1 REST routes

Nested under course where it reads naturally; flat where the resource has a meaningful global identity.

```
GET    /lesson?CourseId={uuid}                 # list lessons for a course (or all if admin)
POST   /lesson                                  # create lesson
GET    /lesson/:LessonId                        # lesson with all segments, fully expanded
PATCH  /lesson/:LessonId
DELETE /lesson/:LessonId

POST   /lesson/:LessonId/segment               # add a segment + its template in one call
PATCH  /lesson-segment/:SegmentId/reorder      # batch reorder
PATCH  /lesson-segment/:SegmentId
DELETE /lesson-segment/:SegmentId

# Template-specific authoring endpoints (lesson wordlists — admin)
GET    /wordlist/:WordlistId                    # wordlist + all entries + examples + collocations
PATCH  /wordlist/:WordlistId
POST   /wordlist/:WordlistId/entry              # add an entry inline (carries lemma, entryType, POS, etc.)
PATCH  /wordlist-entry/:EntryId
DELETE /wordlist-entry/:EntryId
POST   /wordlist-entry/:EntryId/example         # add an example
POST   /wordlist-entry/:EntryId/collocation     # add a collocation

# User saved-words (the user owns a Wordlist with OwnerUserId set)
GET    /me/wordlist                              # the current user's wordlist(s)
POST   /me/wordlist/:WordlistId/save             # save (copy) an existing WordlistEntry into the user's list
POST   /me/wordlist/:WordlistId/entry            # add a custom entry the user typed in
# Editing & deleting reuse /wordlist-entry/:EntryId — same model

GET    /grammar-topic/:TopicId                  # the topic + all blocks + their payloads
PATCH  /grammar-topic/:TopicId
POST   /grammar-topic/:TopicId/block             # add a new block (any blockType); body carries payload
PATCH  /grammar-block/:BlockId/reorder           # batch reorder within a topic
PATCH  /grammar-block/:BlockId                   # update payload (the handler picks Text vs Pattern)
DELETE /grammar-block/:BlockId

# Translations — generic (admin-only)
GET    /translation?entityType=&EntityId=&languageCode=
POST   /translation                             # upsert by (entityType, EntityId, field, languageCode)

# Segment type catalog — admin UI populates dropdowns from here
GET    /segment-type                            # list active segment types
GET    /segment-kind?SegmentTypeId=         # list active templates (optionally filtered by type)
```

### 6.2 Localization at the response layer

Every read endpoint accepts:

- `Accept-Language` header, OR
- `?lang=uk,en` query param (comma-separated fallback chain)

The response constructor returns localized strings as **localized value objects** so the client knows which language it got:

```jsonc
"title": { "value": "Базова лексика", "lang": "uk" }
```

For untranslated fields, the value is in the source language (English for now) with `lang: "en"` — e.g. `{ "value": "Basics", "lang": "en" }`. The client renders both shapes uniformly; the `lang` field lets it show a "no translation yet" badge when it doesn't match the requested language.

### 6.3 Lesson read shape

A single `GET /lesson/:LessonId` returns the full content tree so the lesson page is one round-trip. The template registry tells the response constructor how to shape each segment.

```jsonc
{
  "success": true,
  "lesson": {
    "id": "…",
    "CourseId": "…",
    "title": { "value": "Food basics", "lang": "en" },
    "description": { "value": "Базовий курс лексики", "lang": "uk" },
    "order": 0,
    "status": "published",
    "segments": [
      {
        "id": "…",
        "segmentType": { "code": "vocabulary", "name": { "value": "Vocabulary", "lang": "en" } },
        "segmentKind": {
          "code": "wordlist",
          "name": { "value": "Wordlist", "lang": "en" },
        },
        "order": 0,
        "title": null,
        "wordlist": {
          "id": "…",
          "title": { "value": "Fruits", "lang": "en" },
          "description": null,
          "entries": [
            {
              "id": "we-1",
              "order": 0,
              "lemma": "apple",
              "entryType": "word",
              "partOfSpeech": "noun",
              "transcription": "ˈæp.əl",
              "v2": null,
              "v3": null,
              "audioUrl": null,
              "note": null,
              "definition": { "value": "яблуко", "lang": "uk" },
              "examples": [{ "id": "ex-1", "text": { "value": "I ate an apple.", "lang": "en" } }],
              "collocations": [],
            },
            {
              "id": "we-2",
              "order": 1,
              "lemma": "get confused about",
              "entryType": "phrase",
              "partOfSpeech": "verb",
              "transcription": null,
              "v2": null,
              "v3": null,
              "audioUrl": null,
              "note": null,
              "definition": { "value": "заплутатися (в чомусь)", "lang": "uk" },
              "examples": [
                {
                  "id": "ex-2",
                  "text": { "value": "I always get confused about the timezone.", "lang": "en" },
                },
              ],
              "collocations": [],
            },
          ],
        },
      },
      {
        "id": "…",
        "segmentType": { "code": "grammar", "name": { "value": "Grammar", "lang": "en" } },
        "segmentKind": {
          "code": "topic",
          "name": { "value": "Grammar Topic", "lang": "en" },
        },
        "order": 1,
        "title": { "value": "How to ask people to do things", "lang": "en" },
        "grammarTopic": {
          "id": "…",
          "title": { "value": "want + object + to V1", "lang": "en" },
          "tense": "Present Simple",
          "blocks": [
            {
              "id": "…",
              "blockType": "text",
              "order": 0,
              "textRole": "description",
              "text": { "value": "Use <b>want</b> with a personal object…", "lang": "en" },
            },
            {
              "id": "…",
              "blockType": "pattern",
              "order": 1,
              "form": "affirmative",
              "markup": "I/We/They want [V1] (to him/her/them)",
              "parsedMarkup": [
                { "type": "options", "options": ["I", "We", "They"] },
                { "type": "static", "text": "want" },
                { "type": "slot", "slot": "V1" },
                {
                  "type": "optional",
                  "tokens": [
                    { "type": "static", "text": "to" },
                    { "type": "options", "options": ["him", "her", "them"] },
                  ],
                },
              ],
            },
            {
              "id": "…",
              "blockType": "pattern",
              "order": 2,
              "form": "negative",
              "markup": "I/We/They do not want [V1] (to him/her/them)",
              "parsedMarkup": [
                /* …tokens… */
              ],
            },
            {
              "id": "…",
              "blockType": "pattern",
              "order": 3,
              "form": "question",
              "markup": "Do I/We/They want [V1] (to him/her/them)?",
              "parsedMarkup": [
                /* …tokens… */
              ],
            },
            {
              "id": "…",
              "blockType": "text",
              "order": 4,
              "textRole": "example",
              "text": { "value": "I want you to come.", "lang": "en" },
            },
            {
              "id": "…",
              "blockType": "text",
              "order": 5,
              "textRole": "example",
              "text": { "value": "They don't want her to leave.", "lang": "en" },
            },
          ],
        },
      },
    ],
  },
}
```

`grammarTopic.title` and `grammarTopic.tense` are first-class attributes of the topic (the topic-level fields, not blocks). Each block in `grammarTopic.blocks` is one row joined to its payload table. `text` blocks carry `textRole` + `text` — `text` is always sanitized HTML, so the client renders it as HTML without re-escaping. `pattern` blocks carry `form` + `markup` + `parsedMarkup`. The client renders blocks in the given order, walking `parsedMarkup`'s token array per the grammar in §1.4; the registry tells the response constructor how to shape each kind.

### 6.4 Template rendering strategy

- **Server returns `parsedMarkup`.** The client never re-parses `markup`.
- **The client owns presentation.** A small renderer maps token kinds to React components; new token kinds = new component.
- **Author UI works on the markup string.** Round-trip: edit `markup` → PATCH → server re-parses → returns updated `parsedMarkup`.

---

## 7. Example Data

### 7.1 DB rows

```sql
-- Catalog (seeded once from code on app startup)
INSERT INTO "SegmentType" (id, code, name) VALUES
 ('st-voc',  'vocabulary', 'Vocabulary'),
 ('st-gram', 'grammar',    'Grammar');

INSERT INTO "SegmentKind" (id, "SegmentTypeId", code, name, "tableName") VALUES
 ('sk-wl', 'st-voc',  'wordlist', 'Wordlist',      'Wordlist'),
 ('sk-gt', 'st-gram', 'topic',    'Grammar Topic', 'GrammarTopic');

-- A lesson with one vocabulary segment + one grammar segment
INSERT INTO "Lesson" (id, "CourseId", title, "order", status)
VALUES ('lesson-1', 'course-1', 'Food basics', 0, 'published');

-- Lesson wordlist: OwnerUserId is NULL
INSERT INTO "Wordlist" (id, title, "OwnerUserId") VALUES ('wl-1', 'Fruits', NULL);

-- Each entry is self-contained; no global Word table
INSERT INTO "WordlistEntry" (id, "WordlistId", lemma, "entryType", "partOfSpeech", "order") VALUES
 ('we-1', 'wl-1', 'apple',         'word',   'noun', 0),
 ('we-2', 'wl-1', 'have a picnic', 'phrase', 'verb', 1);

INSERT INTO "Translation" (entityType, "EntityId", field, "languageCode", value) VALUES
 ('wordlist_entry', 'we-1', 'definition', 'uk', 'яблуко'),
 ('wordlist_entry', 'we-2', 'definition', 'uk', 'влаштувати пікнік');

INSERT INTO "LessonSegment" (id, "LessonId", "SegmentKindId", "SegmentContentRowId", "order")
VALUES ('seg-1', 'lesson-1', 'sk-wl', 'wl-1', 0);

-- Grammar topic: title + tense on the topic row; description + one pattern + one example as blocks
INSERT INTO "GrammarTopic" (id, title, tense) VALUES
 ('gt-1', 'want + object + to V1', 'Present Simple');

INSERT INTO "GrammarBlock" (id, "GrammarTopicId", "blockType", "order") VALUES
 ('gb-1', 'gt-1', 'text',    0),
 ('gb-2', 'gt-1', 'pattern', 1),
 ('gb-3', 'gt-1', 'text',    2);

INSERT INTO "GrammarBlockText" ("GrammarBlockId", "textRole", text) VALUES
 ('gb-1', 'description', 'Use <b>want</b> with a personal object to express what you would like someone else to do.'),
 ('gb-3', 'example',     'I want you to come.');

INSERT INTO "GrammarBlockPattern" ("GrammarBlockId", form, markup, "parsedMarkup") VALUES
 ('gb-2', 'affirmative',
  'I/We/They want [V1] (to him/her/them)',
  '[{"type":"options","options":["I","We","They"]},{"type":"static","text":"want"},{"type":"slot","slot":"V1"},{"type":"optional","tokens":[{"type":"static","text":"to"},{"type":"options","options":["him","her","them"]}]}]'::jsonb);

INSERT INTO "LessonSegment" (id, "LessonId", "SegmentKindId", "SegmentContentRowId", "order")
VALUES ('seg-2', 'lesson-1', 'sk-gt', 'gt-1', 1);
```

### 7.2 Author POST to create a segment + template atomically

```http
POST /lesson/lesson-1/segment
Content-Type: application/json

{
  "SegmentKindId": "sk-wl",
  "order": 0,
  "content": {
    "title": "Fruits & idioms",
    "entries": [
      { "lemma": "apple",         "entryType": "word",   "partOfSpeech": "noun", "order": 0 },
      { "lemma": "banana",        "entryType": "word",   "partOfSpeech": "noun", "order": 1 },
      { "lemma": "have a picnic", "entryType": "phrase", "partOfSpeech": "verb", "order": 2 }
    ]
  }
}
```

The service:

1. Loads `SegmentKind` by id → looks up the handler in the registry by `SegmentKind.code`.
2. Inserts the `Wordlist` (`OwnerUserId` left `NULL` because this is lesson content).
3. Inserts each `WordlistEntry` directly — no lookup against a global lexicon, no dedup.
4. Inserts the `LessonSegment` with `SegmentKindId = sk-wl` and `SegmentContentRowId = <new wordlist id>`.
5. All in a single transaction.

---

## 8. Best Practices

**Naming**

- Tables and FKs `PascalCase` (project rule).
- Enums `VARCHAR(N)`, values lowercase snake_case.
- Endpoint paths `kebab-case` resources; route params `PascalCase` matching the FK (`:CourseId`, `:LessonId`, `:WordlistId`).

**Template architecture**

- One folder per template under `modules/<segment-type>/templates/<template-name>/` with its entity, repository, service, response constructor, and `register.ts` that hooks it into the registry.
- The registry is a single `Map<code, KindHandler>` (keyed by `SegmentKind.code`, e.g. `'wordlist'`) populated in `LessonSegmentModule`.
- Adding a template is: new entity + migration + seed one `SegmentKind` row + one `register()` call. The `SegmentKind` seed is co-located with the handler so they stay in sync.

**Migrations**

- One file per table; follow the `<timestamp>-create-<name>.ts` pattern already in `apps/api/src/database/migrations/`.
- Always implement `down()`.
- Indexes named `idx_<table>_<column>`.
- Add `CHECK` constraints for enum validity at the DB level (defense in depth alongside the application enum).

**Content rendering**

- Server stores source `markup` + cached `parsedMarkup`; clients render from `parsedMarkup`.
- All translatable fields returned as `{ value, lang }`.

**Localization**

- Never add a translation column to a content table. All translations go through `Translation`.
- Resolve translations in **one batched query per request**, not per row.
- Source language is currently a global assumption (English). If/when non-English source content appears, add a `sourceLanguageCode` column at that point instead of pre-building it.

**Maintainability**

- Response constructors live in `structs/` next to their input interfaces; they own the response shape and are easy to unit-test.
- Services accept input interfaces, never DTOs (project rule).
- Every controller returns a response DTO extending `BaseResponseDto` (project rule).

---

## Implementation Roadmap

Order chosen so each step has a deployable, useful endpoint and the next step can build on it without rework. Each step has its own migration and PR.

### Phase 1 — Lesson module (entity exists, module doesn't)

**Goal:** CRUD lessons under a course; admin can list and edit them.

Files to create under `apps/api/src/modules/lesson/`:

- `lesson.module.ts`
- `http/controllers/lesson.controller.ts` — routes from §6.1 for `/lesson`
- `http/dto/` — `create-lesson.dto.ts`, `update-lesson.dto.ts`, `list-lessons-query.dto.ts`, `lesson-response.dto.ts`, `lesson-list-response.dto.ts`, `create-lesson-response.dto.ts`, `update-lesson-response.dto.ts`
- `services/lesson.service.ts`
- `repositories/lesson.repository.ts`
- `structs/` — `lesson-status.enum.ts`, `create-lesson-params.interface.ts`, `update-lesson-params.interface.ts`, `list-lessons-params.interface.ts`, `lesson-list-item.constructor.ts`, `lesson-details.constructor.ts`

Register `LessonModule` in `apps/api/src/app.module.ts`.

No new migration — the `Lesson` table already exists.

### Phase 2 — Localization core

**Goal:** Translations can be written and read for any entity.

- Migration: `create-language.ts`, `create-translation.ts` with the indexes from §2.4.
- Seed: insert initial `Language` rows (`en`, `uk`, plus whatever the team plans first).
- `apps/api/src/database/entities/language.entity.ts`, `translation.entity.ts`.
- New module `apps/api/src/modules/localization/`:
  - `localization.module.ts`
  - `repositories/translation.repository.ts`
  - `services/translation.service.ts` with `upsert()`, `findFor(entityType, ids[], lang[])`, `resolve(entityType, id, field, lang[])`
  - `structs/localized-value.constructor.ts` (`{ value, lang }`)
  - HTTP routes for the generic translation endpoints in §6.1
- A small `LocalizedResolver` helper that response-constructors call: takes a batch of `(entityType, EntityId)` and a fallback chain and returns a `Map` for fast lookup while building the response.

Wire `LessonModule` to use `LocalizedResolver` for `title`, `subtitle`, `description`.

### Phase 3 — Segment catalog + LessonSegment + handler registry

**Goal:** Lessons can hold ordered, typed segments. Catalog tables exist; empty handler registry; no concrete templates yet.

- Migrations: `create-segment-type.ts`, `create-segment-kind.ts`, `create-lesson-segment.ts`.
- Entities: `segment-type.entity.ts`, `segment-kind.entity.ts`, `lesson-segment.entity.ts`.
- New module `apps/api/src/modules/segment-catalog/`:
  - `segment-catalog.module.ts`
  - `services/segment-catalog.service.ts` — exposes `getType(code)`, `getKind(code)`, `listActive()`
  - `services/segment-catalog-seeder.service.ts` — `onModuleInit` upserts rows from a code-side registry list
  - controller for `GET /segment-type`, `GET /segment-kind`
- New module `apps/api/src/modules/lesson-segment/`:
  - `lesson-segment.module.ts`
  - controller for segment CRUD + reorder (§6.1)
  - `services/lesson-segment.service.ts` — orchestrates atomic create (segment + template via handler registry)
  - `services/kind-handler-registry.service.ts` — `register(code, handler)`, `get(code)`; keyed by `SegmentKind.code`
  - `structs/kind-handler.interface.ts` (defines `createContent`, `loadContent`, `serializeContent`)
  - repository

Each later phase that adds a concrete template (Phases 4/5/6) appends one entry to the catalog seeder and calls `kindHandlerRegistry.register(code, handler)`.

### Phase 4 — Vocabulary segment + Wordlist template

**Goal:** First concrete template. Admin can attach a wordlist to a lesson; lesson read returns the wordlist with all entries, examples, and collocations.

- Migrations: `create-wordlist.ts` (with `OwnerUserId` nullable fk), `create-wordlist-entry.ts` (with `CHECK (entryType IN ('word','phrase'))`, `(WordlistId, order)` index, `lower(lemma)` index), `create-wordlist-entry-example.ts`, `create-wordlist-entry-collocation.ts`.
- Entities for all four.
- Module `apps/api/src/modules/vocabulary/`:
  - `vocabulary.module.ts`
  - `templates/wordlist/` — entity refs, repository, service, response constructor that joins entries + examples + collocations in one query, `register.ts`
  - `services/wordlist-entry.service.ts` — create/update/delete/reorder; no findOrCreate, no dedup
  - controllers for `/wordlist/*`, `/wordlist-entry/*`
- Wire `register.ts` into `VocabularyModule` so the wordlist handler joins the registry.
- Lesson read endpoint now returns vocabulary segments with full wordlist content (localized).

### Phase 5 — Grammar segment + Topic kind

**Goal:** One grammar kind under the grammar segment type, with flexible ordered blocks. Replaces what was once two kinds.

- Migrations: `create-grammar-topic.ts` (with `title` + `tense` columns), `create-grammar-block.ts` (with `CHECK (blockType IN ('text','pattern'))` and `(GrammarTopicId, order)` index), `create-grammar-block-text.ts` (with `CHECK (textRole IN ('description','example'))`), `create-grammar-block-pattern.ts`. Each block payload migration creates a 1:1 row keyed by `GrammarBlockId`.
- Entities for all four.
- Module `apps/api/src/modules/grammar/`:
  - `grammar.module.ts`
  - `templates/topic/` — entity refs for `GrammarTopic` + `GrammarBlock` + payload tables, repository, service, response constructor that joins all blocks + payloads in one query, `register.ts`
  - `services/pattern-parser.service.ts` — parses `markup` → `parsedMarkup` token array on every create/update of a `pattern` block
  - `services/block-orchestrator.service.ts` — atomic create/update/delete/reorder of blocks; picks the right payload table based on `blockType`; sanitizes the `text` field of every `text` block on write against the HTML allowlist (`b`, `i`, `u`, `em`, `strong`, `code`, `br`, `p`, `ul`/`ol`/`li`, `a`) — plain prose passes through unchanged
  - controllers for `/grammar-topic/*`, `/grammar-block/*`
- Lesson read endpoint now returns grammar segments alongside vocabulary, with all blocks in author order.

### Phase 6 — Shared types

**Goal:** Frontend consumes API response types from `packages/shared` instead of redefining them.

- In `packages/shared/src/`:
  - `enums/lesson-status.ts`, `part-of-speech.ts` (the small in-code enums only)
  - `types/segment-type-ref.ts`, `segment-kind-ref.ts` (`{ code, name }` — DB-driven, frontend treats `code` as string)
  - `types/localized-value.ts`, `lesson-response.ts`, `segment-response.ts`, `wordlist-response.ts`, `grammar-topic-response.ts`, `grammar-block-response.ts`
- Import these from both `apps/api` (response constructors implement them) and `apps/web` (hooks type their responses).

### Phase 7 — Frontend lesson rendering

Not strictly part of this backend doc, but the natural next milestone. The shape in §6.3 is the contract; UI work is unblocked once Phase 4 ships.

### Future, not part of this roadmap (schema is ready):

- User saved-words — **already in scope**: a `Wordlist` row with `OwnerUserId` set, populated by the routes under `/me/wordlist/*`. No new tables needed; the only work is the UI + the save/copy endpoint. Listed here as a reminder that the schema is ready.
- `UserProgress`, `SpacedRepetitionState` referencing `WordlistEntry.id` and `Lesson.id` — Phase F2. Per-entry granularity: training the same word in two courses tracks two distinct items, which matches the per-list authoring model.
- `Exercise` tables (quiz / flashcard / matching), each registering as a segment template — Phase F3.
- `TranslationHistory` for full version history — Phase F4.
- Lesson versioning via `LessonSnapshot` — Phase F5.

---

## Verification

End-to-end, the design is verified when:

1. **Migrations run cleanly:** `cd apps/api && npm run migration:run` succeeds against a fresh DB created by `docker compose up -d`.
2. **Author flow works** via the API:
   - `POST /course` (existing) → `POST /lesson` → `POST /lesson/:LessonId/segment` with a wordlist payload → `GET /lesson/:LessonId` returns the lesson with the wordlist segment expanded.
   - `POST /translation` adds a Ukrainian translation for a word; `GET /lesson/:LessonId?lang=uk` returns the localized value with `lang: 'uk'`; `GET /lesson/:LessonId?lang=pl` (Polish — not seeded yet) returns the source value with `lang: 'en'` (fallback).
3. **Same flow for grammar:** `POST /lesson/:LessonId/segment` with a `topic` kind and an empty topic (optionally with `title`/`tense`), then `POST /grammar-topic/:TopicId/block` to add `text` blocks (with `textRole` of `description` or `example`) and `pattern` blocks (with `form`) in any order. `GET /lesson/:LessonId` returns the segment with the topic's `title`/`tense` plus all blocks in author order; each `pattern` block carries `parsedMarkup` (the token array).
4. **Adding a new template is local:** the diff for adding a hypothetical `flashcard` template touches only one new folder under `modules/vocabulary/templates/flashcard/` + one migration + one entry in the catalog seeder + one `register()` call. No edits to LessonSegment, no changes to existing templates. After deploy, `GET /segment-kind` lists the new row and the admin UI dropdown picks it up with no code change.
5. **Adding a new language is data-only:** `INSERT INTO "Language" ('pt-BR', ...)` is sufficient; no schema migration; translations into `pt-BR` go through the same `POST /translation` path.
6. **Catalog is the source of truth:** `LessonSegment` cannot be created with a `SegmentKindId` that doesn't exist (FK constraint). Deactivating a `SegmentKind` (`isActive=false`) hides it from new authoring but leaves existing segments readable.
7. **Unit tests** on `PatternParserService` cover each token type (static, options, optional, slot) and round-trip `markup` → `parsedMarkup` → re-render.
8. **One-query localization:** instrument `GET /lesson/:LessonId?lang=uk` and confirm exactly one query hits the `Translation` table per request (a batched fetch for every translatable `(entityType, EntityId)` in the lesson), not one per row.

---

## Worked Example — One Full Lesson Stored in the DB

A concrete walk-through of which rows exist in every table when one realistic lesson is stored. The lesson teaches the verb **want** at A2 level. Vocabulary segment: 3 words + 2 phrases. Grammar segment: the _want + obj + to V1_ pattern with 3 variants. Short IDs (`lsn-3`, `wl-1`, …) are used in place of UUIDs so the tables are readable; in the real DB these are UUIDs.

### What the lesson looks like to a learner

```
Course: "English A2 — Daily Life"   (id: crs-1)
└── Lesson 3: "Making plans"        (id: lsn-3)
    ├── Segment 0 → wordlist — "Plans & invitations"
    │     ├── plan                  (word,   noun)  →  план
    │     ├── invite                (word,   verb)  →  запрошувати
    │     ├── picnic                (word,   noun)  →  пікнік   [collocation: "have a picnic"]
    │     ├── get confused about    (phrase, verb)  →  заплутатися (в чомусь)
    │     └── a round trip ticket   (phrase, noun)  →  квиток в обидва кінці
    │
    └── Segment 1 → topic
          Topic attributes (fixed slots, not blocks):
            title:  "want + object + to V1"
            tense:  "Present Simple"
          Blocks (ordered list authored freely by admin):
          0. text · description           — "Use *want* with a personal object to express what you would like someone else to do."
          1. pattern (form: affirmative)  — "I/We/They want [V1] (to him/her/them)"
          2. pattern (form: negative)     — "I/We/They do not want [V1] (to him/her/them)"
          3. pattern (form: question)     — "Do I/We/They want [V1] (to him/her/them)?"
          4. text · example               — "I want you to come."
          5. text · example               — "They don't want her to leave."
```

> A grammar topic has two fixed attributes (`title`, `tense`) that live directly on the topic row, plus an ordered list of typed blocks for the variable content. Each block is either a `text` block (with a `textRole` of `description` or `example`) or a `pattern` block (with a `form` like `affirmative` / `negative` / `question` / `formal` / `US`). Admin controls type, role, count, and order. Pattern variants are _sibling blocks_, not nested children.

---

### Catalog tables — seeded once at startup, shared by every lesson

**`Language`** — for now we seed only **English** (the learning language) and **Ukrainian** (the first UI language). Other languages will be added as separate `INSERT`s with zero schema change.

| code | name      | nativeName | isActive |
| ---- | --------- | ---------- | -------- |
| en   | English   | English    | true     |
| uk   | Ukrainian | Українська | true     |

**`SegmentType`**

| id    | code       | name       | isActive |
| ----- | ---------- | ---------- | -------- |
| sty-v | vocabulary | Vocabulary | true     |
| sty-g | grammar    | Grammar    | true     |

**`SegmentKind`**

| id    | SegmentTypeId | code     | name          | tableName    | isActive |
| ----- | ------------- | -------- | ------------- | ------------ | -------- |
| sk-wl | sty-v         | wordlist | Wordlist      | Wordlist     | true     |
| sk-gt | sty-g         | topic    | Grammar Topic | GrammarTopic | true     |

---

### Lesson core

**`Course`** (already exists, shown for context only)

| id    | name                    | …   |
| ----- | ----------------------- | --- |
| crs-1 | English A2 — Daily Life | …   |

**`Lesson`**

| id    | CourseId | title        | subtitle                                 | description                                                                             | order | status    |
| ----- | -------- | ------------ | ---------------------------------------- | --------------------------------------------------------------------------------------- | ----- | --------- |
| lsn-3 | crs-1    | Making plans | Talking about invitations and intentions | Learn how to invite people and talk about plans using the _want + object + to_ pattern. | 2     | published |

**`LessonSegment`** — two rows, one per content block. `SegmentKindId` points to the catalog; `SegmentContentRowId` points to the row in the table named by that template's `tableName`.

| id    | LessonId | SegmentKindId | SegmentContentRowId | title                          | description | order |
| ----- | -------- | ------------- | ------------------- | ------------------------------ | ----------- | ----- |
| seg-1 | lsn-3    | sk-wl         | wl-1                | NULL                           | NULL        | 0     |
| seg-2 | lsn-3    | sk-gt         | gt-1                | How to ask people to do things | NULL        | 1     |

---

### Vocabulary side — `Wordlist`, `WordlistEntry`, `WordlistEntryExample`, `WordlistEntryCollocation`

**`Wordlist`** — the content row pointed to by `seg-1.SegmentContentRowId`. `OwnerUserId` is `NULL` for lesson wordlists; non-`NULL` when this wordlist is a user's personal saved-words list (see §1.3).

| id   | title               | description | OwnerUserId |
| ---- | ------------------- | ----------- | ----------- |
| wl-1 | Plans & invitations | NULL        | NULL        |

**`WordlistEntry`** — each entry is self-contained. Every column that used to live on a global `Word` row now lives on the entry directly. Two admins teaching `plan` get two independent rows; their translations, examples, and collocations are independent too.

| id   | WordlistId | lemma               | entryType | partOfSpeech | v2      | v3      | transcription | audioUrl | order | note                      |
| ---- | ---------- | ------------------- | --------- | ------------ | ------- | ------- | ------------- | -------- | ----- | ------------------------- |
| we-1 | wl-1       | plan                | word      | noun         | NULL    | NULL    | plæn          | NULL     | 0     | NULL                      |
| we-2 | wl-1       | invite              | word      | verb         | invited | invited | ɪnˈvaɪt       | NULL     | 1     | Common in social contexts |
| we-3 | wl-1       | picnic              | word      | noun         | NULL    | NULL    | ˈpɪk.nɪk      | NULL     | 2     | NULL                      |
| we-4 | wl-1       | get confused about  | phrase    | verb         | NULL    | NULL    | NULL          | NULL     | 3     | Often followed by `about` |
| we-5 | wl-1       | a round trip ticket | phrase    | noun         | NULL    | NULL    | NULL          | NULL     | 4     | NULL                      |

**`WordlistEntryExample`** — example sentences attached to one entry.

| id   | WordlistEntryId | text                                      | order |
| ---- | --------------- | ----------------------------------------- | ----- |
| ex-1 | we-1            | We made a plan for the weekend.           | 0     |
| ex-2 | we-2            | She invited me to dinner.                 | 0     |
| ex-3 | we-2            | They invited us to their wedding.         | 1     |
| ex-4 | we-3            | We had a picnic by the river.             | 0     |
| ex-5 | we-4            | I always get confused about the timezone. | 0     |
| ex-6 | we-5            | I bought a round trip ticket to Berlin.   | 0     |

**`WordlistEntryCollocation`** — collocations / common prepositions attached to one entry.

| id    | WordlistEntryId | expression    | explanation                                 | order |
| ----- | --------------- | ------------- | ------------------------------------------- | ----- |
| col-1 | we-3            | have a picnic | Idiomatic — use _have_, not _do_ or _make_. | 0     |

---

### Grammar side — `GrammarTopic`, `GrammarBlock`, `GrammarBlockText`, `GrammarBlockPattern`

**`GrammarTopic`** — the content row pointed to by `seg-2.SegmentContentRowId`. `title` and `tense` live here as 0..1 columns (unordered, at most one of each). Everything else lives in ordered `GrammarBlock` rows.

| id   | title                 | tense          |
| ---- | --------------------- | -------------- |
| gt-1 | want + object + to V1 | Present Simple |

**`GrammarBlock`** — ordered children of a topic. `blockType` is **structural** — it tells you which payload table to join (`text` → `GrammarBlockText`, `pattern` → `GrammarBlockPattern`).

| id   | GrammarTopicId | blockType | order |
| ---- | -------------- | --------- | ----- |
| gb-1 | gt-1           | text      | 0     |
| gb-2 | gt-1           | pattern   | 1     |
| gb-3 | gt-1           | pattern   | 2     |
| gb-4 | gt-1           | pattern   | 3     |
| gb-5 | gt-1           | text      | 4     |
| gb-6 | gt-1           | text      | 5     |

**`GrammarBlockText`** — payload for `text` blocks. The block's id is also the payload's pk (1:1). `textRole` is **semantic** — it labels what kind of text this is so the UI can style it (description vs example). `text` is sanitized HTML in the source language; plain prose passes through untouched and renders fine, while descriptions can use a small allowlist of tags (`b`, `i`, `u`, `em`, `strong`, `code`, `br`, `p`, `ul`/`ol`/`li`, `a`) for emphasis. Translations live in `Translation` keyed by `('grammar_block_text', GrammarBlockId, 'text', lang)`.

| GrammarBlockId | textRole    | text                                                                                        |
| -------------- | ----------- | ------------------------------------------------------------------------------------------- |
| gb-1           | description | Use `<b>want</b>` with a personal object to express what you would like someone else to do. |
| gb-5           | example     | I want you to come.                                                                         |
| gb-6           | example     | They don't want her to leave.                                                               |

**`GrammarBlockPattern`** — payload for `pattern` blocks: an editable markup string, a cached `parsedMarkup` (the markup as a structured token array), plus the free-form `form` label (affirmative / negative / question / formal / US …).

| GrammarBlockId | form        | markup                                         | parsedMarkup (JSONB, abbreviated)                                                                                 |
| -------------- | ----------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| gb-2           | affirmative | `I/We/They want [V1] (to him/her/them)`        | `[ options[I,We,They], static "want", slot V1, optional[ static "to", options[him,her,them] ] ]`                  |
| gb-3           | negative    | `I/We/They do not want [V1] (to him/her/them)` | `[ options[I,We,They], static "do not", static "want", slot V1, optional[ static "to", options[him,her,them] ] ]` |
| gb-4           | question    | `Do I/We/They want [V1] (to him/her/them)?`    | `[ static "Do", options[I,We,They], static "want", slot V1, optional[ static "to", options[him,her,them] ] ]`     |

---

### Translations — one generic table for every translatable field

Source-language text (English) lives on the entity columns above. The `Translation` table holds every _other_ language. Below: every translation row for this lesson. For now we only translate into **Ukrainian** — other languages will be added later by inserting more rows with different `languageCode` values; no schema change required.

**`Translation`**

| id   | entityType                                          | EntityId | field       | languageCode | value                                                                                      |
| ---- | --------------------------------------------------- | -------- | ----------- | ------------ | ------------------------------------------------------------------------------------------ |
| t-01 | lesson                                              | lsn-3    | title       | uk           | Plans & invitations _(Ukrainian)_                                                          |
| t-02 | lesson                                              | lsn-3    | description | uk           | Learn how to invite people… _(Ukrainian)_                                                  |
| t-03 | wordlist                                            | wl-1     | title       | uk           | Plans & invitations _(Ukrainian)_                                                          |
| t-04 | wordlist_entry                                      | we-1     | definition  | uk           | план _(Ukrainian)_                                                                         |
| t-05 | wordlist_entry                                      | we-2     | definition  | uk           | запрошувати _(Ukrainian)_                                                                  |
| t-06 | wordlist_entry                                      | we-3     | definition  | uk           | пікнік _(Ukrainian)_                                                                       |
| t-07 | wordlist_entry                                      | we-4     | definition  | uk           | заплутатися (в чомусь) _(Ukrainian — phrase translation)_                                  |
| t-08 | wordlist_entry                                      | we-5     | definition  | uk           | квиток в обидва кінці _(Ukrainian — phrase translation)_                                   |
| t-09 | wordlist_entry                                      | we-2     | note        | uk           | Часто вживається в соціальних ситуаціях _(Ukrainian — per-entry note)_                     |
| t-10 | wordlist_entry_example                              | ex-1     | text        | uk           | Ми склали план на вихідні _(Ukrainian)_                                                    |
| t-11 | wordlist_entry_example                              | ex-2     | text        | uk           | Вона запросила мене на вечерю _(Ukrainian)_                                                |
| —    | _(ex-3 intentionally has no Ukrainian translation)_ |          |             |              | _resolver will fall back to English from `WordlistEntryExample.text`_                      |
| t-12 | wordlist_entry_example                              | ex-4     | text        | uk           | Ми влаштували пікнік біля річки _(Ukrainian)_                                              |
| t-13 | wordlist_entry_example                              | ex-5     | text        | uk           | Я завжди плутаюся з часовими поясами _(Ukrainian)_                                         |
| t-14 | wordlist_entry_collocation                          | col-1    | explanation | uk           | Стійкий вираз — вживається з _have_ _(Ukrainian)_                                          |
| t-15 | grammar_topic                                       | gt-1     | title       | uk           | хотіти, щоб хтось щось зробив _(Ukrainian — translates the grammar topic title)_           |
| t-16 | grammar_block_text                                  | gb-1     | text        | uk           | Use _want_ with a personal object… _(Ukrainian)_                                           |
| t-17 | grammar_block_text                                  | gb-5     | text        | uk           | I want you to come _(Ukrainian)_                                                           |
| t-18 | grammar_block_text                                  | gb-6     | text        | uk           | They don't want her to leave _(Ukrainian)_                                                 |
| t-19 | lesson_segment                                      | seg-2    | title       | uk           | Як попросити когось щось зробити _(Ukrainian)_ — translates the per-segment override title |

> Notes:
>
> - The same `(entityType, EntityId)` pair can appear multiple times with different `field` values — see `we-2` above, which has both a `definition` (t-05) and a `note` (t-09) translation. The unique constraint is `(entityType, EntityId, field, languageCode)`, not `(entityType, EntityId, languageCode)`.
> - The topic's `tense` field is usually not translated — tense names are technical terms typically rendered in the learning language. If ever needed: `('grammar_topic', gt-1, 'tense', 'uk')`.
> - The pattern blocks (`gb-2`/`gb-3`/`gb-4`) carry markup, not translatable prose; markup tokens render the same regardless of UI language. A localized markup, if ever needed, goes in `Translation` keyed by `('grammar_block_pattern', GrammarBlockId, 'markup', lang)` — no schema change.

---

### How a read of this lesson resolves to JSON

`GET /lesson/lsn-3?lang=uk,en` runs exactly two queries:

1. **Content tree** — one query with joins loads `Lesson`, both `LessonSegment` rows, `Wordlist` with its 5 `WordlistEntry` rows (3 words + 2 phrases) → 6 `WordlistEntryExample` + 1 `WordlistEntryCollocation`, and `GrammarTopic` (with its `title`/`tense` columns) → 6 `GrammarBlock` rows joined left to `GrammarBlockText` and `GrammarBlockPattern` (each block matches exactly one payload table per its `blockType`).
2. **Translations batch** — one query: `SELECT * FROM "Translation" WHERE ("entityType","EntityId") IN (…the 19 distinct pairs from step 1…) AND "languageCode" IN ('uk','en')`. (The pair count is the count of translatable rows, not the count of translation rows — `we-2` contributes one pair even though it has both a `definition` and a `note` translation.)

The response constructor merges them per the §6.3 shape. Fields with a Ukrainian translation come back as `{ value: "<uk text>", lang: "uk" }`. The one example without a Ukrainian translation (`ex-3`) comes back as `{ value: "They invited us to their wedding.", lang: "en" }` so the client can flag it.

---

### Row counts for this one lesson

| Table                          | Rows from this lesson                                                  |
| ------------------------------ | ---------------------------------------------------------------------- |
| `Lesson`                       | 1                                                                      |
| `LessonSegment`                | 2                                                                      |
| `Wordlist`                     | 1                                                                      |
| `WordlistEntry`                | 5 _(3 words + 2 phrases — each entry self-contained, no global dedup)_ |
| `WordlistEntryExample`         | 6                                                                      |
| `WordlistEntryCollocation`     | 1                                                                      |
| `GrammarTopic`                 | 1                                                                      |
| `GrammarBlock`                 | 6                                                                      |
| `GrammarBlockText`             | 3                                                                      |
| `GrammarBlockPattern`          | 3                                                                      |
| `Translation`                  | 19                                                                     |
| **Catalog (one-time, shared)** | `Language` 2, `SegmentType` 2, `SegmentKind` 2                         |

If another lesson also teaches _plan_ or _invite_, it gets its own fresh `WordlistEntry` rows with their own translations and examples — no dedup, no cross-lesson linking. This is the simplification we deliberately took: each wordlist is fully self-contained and authors never have to reason about a shared lexicon. The cost is duplicated translation work across courses that teach the same word; the gain is a much simpler authoring model and a much simpler schema.
