# Lesson Domain — API Endpoints

Reference for every endpoint in the lesson domain (localization, segment catalog, lesson segments, vocabulary/wordlist, grammar/topic), grouped by controller.

## Conventions

- **Global prefix:** every route is served under `/api` (e.g. `POST /api/translation`). Paths below omit the prefix.
- **Response envelope:** every response extends `BaseResponseDto`, so every body includes `"success": true`. The tables list the fields _added_ on top of that.
- **Localized values:** translatable fields come back as `{ "value": string, "translation": string | null }`. `value` is **always the source-language** original (so the client always has the English text); `translation` is the requested-language string when one exists, or `null` when it doesn't (use it for a "no translation yet" badge). The languages are **not** repeated per field — they're declared once on the lesson object as `sourceLanguage` (what every `value` is in) and `translationLanguage` (what every `translation` is in). A nullable field is `null` only when both the source column and any translation are empty.
- **Language selection:** read endpoints accept an optional `?lang=` query param — a **single** language slug (e.g. `?lang=uk`), not a comma-separated chain. Resolution walks `[requestedLang, requestedLang-without-region, sourceLanguage]`: the requested translation wins, then its regional base (`pt-BR` → `pt`), then the source-language text on the entity column. The source language is never read from a translation row. Omitting `?lang=` returns source text.
- **Writing translations inline:** create endpoints that support it (currently `POST course/lesson/:LessonId/segment` content) mirror the read shape in reverse: `?lang=` names the single translation language, and each translatable field is sent as `{ value, translation? }` — `value` is stored on the source column, `translation` (when non-empty) is written as a `Translation` row for `?lang=`, atomically with the content. Sending a `translation` without `?lang=` is a **400**. See the create-segment endpoint for the full rules.
- **Per-course language (lesson details only):** for `GET course/lesson/:LessonId/details`, the source language comes from the owning course's `sourceLanguageCode`, and `?lang=` must be one of that course's `translationLanguageCodes` (or the source language itself) — otherwise the request is rejected with **400**. When `?lang=` is omitted, it defaults to the course's **first** translation language (`translationLanguageCodes[0]`); if the course has no translation languages, it falls back to source text. Other read endpoints (`wordlist`, `grammar-topic`) are not course-scoped, use `en` as the source language, and simply return source text when `?lang=` is omitted.
- **Route params** are `PascalCase`, matching the FK they carry (`:CourseId`, `:LessonId`, `:WordlistId`, …).
- **Auth:** endpoints are admin-authoring endpoints; auth wiring is out of scope for this doc.

---

## LessonController — base path `course/lesson`

Lesson CRUD under a course, plus the fully-expanded lesson read.

### `GET course/lesson/:CourseId/list`

List every lesson of a course, ordered.

|             |                           |
| ----------- | ------------------------- |
| **Body**    | —                         |
| **Returns** | `items: LessonListItem[]` |

`LessonListItem`: `{ id, CourseId, title, subtitle, description, order, status, duration, createdAt, updatedAt }` (plain source-language strings; not localized).

```bash
curl http://localhost:3001/api/course/lesson/7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f/list
```

```jsonc
{
  "success": true,
  "items": [
    {
      "id": "627a51ca-d044-433f-8862-bf85cd7b3acd",
      "CourseId": "7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f",
      "title": "Making plans",
      "subtitle": "invitations",
      "description": "want + object + to V1",
      "order": 1,
      "status": "draft",
      "duration": null,
      "createdAt": "2026-07-20T21:48:00.000Z",
      "updatedAt": "2026-07-20T21:48:00.000Z",
    },
  ],
}
```

### `GET course/lesson/:LessonId/details?lang=`

The full localized lesson tree: lesson fields + ordered, fully-expanded segments (each segment's content is shaped by its kind handler). One batched translation query for the whole tree.

The source language and the set of allowed translation languages come from the owning **course** (`sourceLanguageCode` / `translationLanguageCodes`):

- `lang` is a **single** language slug — the translation to render.
- It must be one of the course's `translationLanguageCodes` (or equal to the course's `sourceLanguageCode`); anything else → **400 Bad Request**.
- Untranslated fields fall back to the course's source-language text (tagged with that source `lang`).
- Omitting `lang` defaults to the course's **first** translation language (`translationLanguageCodes[0]`); if the course has none, source text is returned.

|             |                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Query**   | `lang?` — single slug; defaults to `translationLanguageCodes[0]`; must be in the course's translation languages (else 400) |
| **Body**    | —                                                                                                                          |
| **Returns** | `lesson: LessonDetails`                                                                                                    |

Localized fields below are shown as `L` = `{ value: string, translation: string | null }` (the Option A shape from the Conventions section: `value` is the source original, `translation` is the requested-language string or `null`). The two languages are declared once on the lesson via `sourceLanguage` / `translationLanguage`.

`LessonDetails`: `{ id, CourseId, sourceLanguage: string, translationLanguage: string | null, title: L, subtitle: L|null, description: L|null, order, status, duration, segments: SegmentView[] }`.

- `sourceLanguage` — the course's source language; the language every `value` is in.
- `translationLanguage` — the language every `translation` is in (the requested/defaulted `?lang=`), or `null` when the source language itself was requested.

Each `SegmentView`: `{ id, order, segmentType: string, segmentKind: string, title: L|null, description: L|null, ...content }` — `segmentType`/`segmentKind` are the plain catalog codes (e.g. `"vocabulary"`, `"wordlist"`); the frontend holds the type/kind list (and their display names) as static constants. `...content` is `wordlist: {...}` for vocabulary segments or `grammarTopic: {...}` for grammar segments (see the wordlist/grammar read shapes below).

```bash
# course source = en, translation languages = [uk]
curl "http://localhost:3001/api/course/lesson/627a51ca-d044-433f-8862-bf85cd7b3acd/details?lang=uk"
```

An unavailable language is rejected:

```bash
curl "http://localhost:3001/api/course/lesson/627a51ca-d044-433f-8862-bf85cd7b3acd/details?lang=pl"
# → 400  { "message": "Language \"pl\" is not available for this course. Available: en, uk", ... }
```

```jsonc
{
  "success": true,
  "lesson": {
    "id": "627a51ca-d044-433f-8862-bf85cd7b3acd",
    "CourseId": "7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f",
    "sourceLanguage": "en",
    "translationLanguage": "uk",
    "title": { "value": "Making plans", "translation": "Плани та запрошення" },
    "subtitle": { "value": "invitations", "translation": null },
    "description": { "value": "want + object + to V1", "translation": null },
    "order": 1,
    "status": "draft",
    "duration": null,
    "segments": [
      {
        "id": "bfeca57a-1b2c-4d3e-8f4a-5b6c7d8e9f0a",
        "order": 0,
        "segmentType": "vocabulary",
        "segmentKind": "wordlist",
        "title": null,
        "description": null,
        "wordlist": {
          "id": "ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b",
          "title": { "value": "Plans & invitations", "translation": null },
          "description": null,
          "entries": [
            {
              "id": "12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c",
              "order": 0,
              "lemma": "plan",
              "entryType": "word",
              "partOfSpeech": "noun",
              "v2": null,
              "v3": null,
              "transcription": null,
              "audioUrl": null,
              "definition": { "value": "plan", "translation": "план" },
              "note": null,
              "examples": [
                {
                  "id": "86bf093a-4e5f-4a6b-8c7d-8e9f0a1b2c3d",
                  "order": 0,
                  "text": { "value": "We made a plan.", "translation": null },
                },
              ],
              "collocations": [],
            },
          ],
        },
      },
      {
        "id": "962933cb-5f6a-4b7c-8d8e-9f0a1b2c3d4e",
        "order": 1,
        "segmentType": "grammar",
        "segmentKind": "topic",
        "title": { "value": "How to ask people to do things", "translation": null },
        "description": null,
        "grammarTopic": {
          "id": "2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f",
          "title": { "value": "want + object + to V1", "translation": null },
          "tense": "Present Simple",
          "blocks": [
            {
              "id": "135daabb-7b8c-4d9e-8f0a-1b2c3d4e5f6a",
              "blockType": "text",
              "order": 0,
              "textRole": "description",
              "text": { "value": "Use <b>want</b> with a personal object.", "translation": null },
            },
            {
              "id": "55142c3d-8c9d-4e0f-8a1b-2c3d4e5f6a7b",
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
          ],
        },
      },
    ],
  },
}
```

### `POST course/lesson/:CourseId`

Create a lesson. New lessons go to the end (max `order` + 1). `CourseId` comes from the route.

|             |                   |
| ----------- | ----------------- |
| **Body**    | `CreateLessonDto` |
| **Returns** | `id: string`      |

`CreateLessonDto`: `{ title: string (≤255, required), subtitle?: string (≤255), description?: string, status?: LessonStatus ('draft'|'published'|'archived'), duration?: int (≥0) }`.

Request body:

```jsonc
{
  "title": "Making plans",
  "subtitle": "invitations",
  "description": "want + object + to V1",
  "status": "draft",
  "duration": 15,
}
```

```bash
curl -X POST http://localhost:3001/api/course/lesson/7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "627a51ca-d044-433f-8862-bf85cd7b3acd" }
```

### `PATCH course/lesson/:CourseId/reorder`

Rewrite lesson order within a course. Items not listed keep their relative order after the listed ones.

|             |                     |
| ----------- | ------------------- |
| **Body**    | `ReorderLessonsDto` |
| **Returns** | — (`{ success }`)   |

`ReorderLessonsDto`: `{ items: { LessonId: uuid, order: int (≥0) }[] (non-empty) }`.

Request body:

```jsonc
{
  "items": [
    { "LessonId": "627a51ca-d044-433f-8862-bf85cd7b3acd", "order": 0 },
    { "LessonId": "11111111-2222-4333-8444-555566667777", "order": 1 },
  ],
}
```

```bash
curl -X PATCH http://localhost:3001/api/course/lesson/7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f/reorder \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true }
```

### `PATCH course/lesson/:LessonId/status`

Update a lesson's status.

|             |                                                      |
| ----------- | ---------------------------------------------------- |
| **Body**    | `UpdateLessonStatusDto` — `{ status: LessonStatus }` |
| **Returns** | `lesson: LessonListItem`                             |

Request body:

```jsonc
{
  "status": "published",
}
```

```bash
curl -X PATCH http://localhost:3001/api/course/lesson/627a51ca-d044-433f-8862-bf85cd7b3acd/status \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{
  "success": true,
  "lesson": { "id": "627a51ca-d044-433f-8862-bf85cd7b3acd", "status": "published", "...": "..." },
}
```

### `DELETE course/lesson/:LessonId`

Delete a lesson (cascades to its segments).

|             |                   |
| ----------- | ----------------- |
| **Body**    | —                 |
| **Returns** | — (`{ success }`) |

```bash
curl -X DELETE http://localhost:3001/api/course/lesson/627a51ca-d044-433f-8862-bf85cd7b3acd
```

```jsonc
{ "success": true }
```

---

## LessonSegmentController — base path `lesson/segment`

Add/update/delete/reorder segments on a lesson. Creating a segment inserts its template content atomically (segment row + content row in one transaction). The `content` shape depends on the chosen `SegmentKindKey`.

### `POST lesson/segment/:LessonId?lang=`

Add a segment + its template content, optionally with translations for the request's `?lang=` language — all in one transaction. `content` is passed to the kind handler.

|             |                                                        |
| ----------- | ------------------------------------------------------ |
| **Query**   | `lang?` — single translation-language slug (e.g. `uk`) |
| **Body**    | `CreateSegmentDto`                                     |
| **Returns** | `id: string, SegmentContentRowId: string`              |

`CreateSegmentDto`: `{ SegmentKindKey: string, title?: string (≤255), description?: string, order?: int (≥0), content: object }`.

`SegmentKindKey` is the SegmentKind's stable **key** (e.g. `"wordlist"`, `"topic"`) — the frontend holds the list of kinds as static constants and sends the key, not a DB id. An unknown key → **404**.

**Translations (`?lang=` + `{ value, translation }`).** Every translatable field in `content` is a `{ value, translation? }` object (`L` for short), the write-side inverse of the read shape: `value` is stored on the entity column (the source language), and `translation` — when present and non-empty — is written as a `Translation` row for the `?lang=` language, atomically with the content. Non-translatable fields stay plain.

- `lang` is a **single** language slug. It must be one of the lesson's course `translationLanguageCodes` (not the source language) — otherwise **400**.
- If `lang` is **omitted** and the body carries any non-empty `translation`, the request is rejected with **400** (a translation with no language to file it under). Omit `lang` **and** the `translation` fields to create source-only content.
- Empty/absent `translation` writes no row.
- Grammar text `value` **and** `translation` are HTML-sanitized (same allowlist).
- The wordlist entry's `lemma` is special: `lemma.value` is the source headword (stored on the `lemma` column); `lemma.translation` is the entry's **meaning**, stored under the `definition` translation field.

**`content` for `wordlist`:**
`{ title: L, description?: L|null, OwnerUserId?: uuid|null, entries?: [{ lemma: L, entryType?, partOfSpeech?, v2?, v3?, transcription?, audioUrl?, note?: L|null, order?, examples?: [{ text: L, order? }], collocations?: [{ expression, explanation?: L|null, order? }] }] }`
where `L = { value: string, translation?: string }`.

**`content` for `topic`:**
`{ title?: L|null, tense?: string|null, blocks?: [ TextBlock | PatternBlock ] }`
where `TextBlock = { blockType:"text", textRole:"description"|"example", text: L, order? }` and `PatternBlock = { blockType:"pattern", form, markup, order? }`.

Request body — vocabulary wordlist segment (all fields), creating `uk` translations:

```bash
curl -X POST "http://localhost:3001/api/lesson/segment/627a51ca-d044-433f-8862-bf85cd7b3acd?lang=uk" \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

```jsonc
{
  "SegmentKindKey": "wordlist",
  "title": "Vocabulary",
  "description": "Words and phrases for making plans",
  "order": 0,
  "content": {
    "title": { "value": "Plans & invitations", "translation": "Плани та запрошення" },
    "description": { "value": "Core words for this lesson", "translation": null },
    "OwnerUserId": null,
    "entries": [
      {
        // lemma.value = headword; lemma.translation = the entry's meaning (stored as `definition`)
        "lemma": { "value": "plan", "translation": "план" },
        "entryType": "word",
        "partOfSpeech": "noun",
        "v2": null,
        "v3": null,
        "transcription": "plæn",
        "audioUrl": "https://cdn.voqu.app/audio/plan.mp3",
        "note": { "value": "Countable noun.", "translation": null },
        "order": 0,
        "examples": [
          {
            "text": {
              "value": "We made a plan for the weekend.",
              "translation": "Ми склали план на вихідні.",
            },
            "order": 0,
          },
          { "text": { "value": "The plan worked perfectly." }, "order": 1 },
        ],
        "collocations": [
          {
            "expression": "make a plan",
            "explanation": { "value": "Use \"make\", not \"do\".", "translation": null },
            "order": 0,
          },
        ],
      },
      {
        "lemma": { "value": "get confused about", "translation": "заплутатися (в чомусь)" },
        "entryType": "phrase",
        "partOfSpeech": "verb",
        "note": { "value": "Often followed by a noun phrase." },
        "order": 1,
        "examples": [
          { "text": { "value": "I always get confused about the timezone." }, "order": 0 },
        ],
        "collocations": [],
      },
    ],
  },
}
```

Request body — grammar topic segment (all fields), creating `uk` translations:

```jsonc
{
  "SegmentKindKey": "topic",
  "title": "How to ask people to do things",
  "description": "Using want + object + to-infinitive",
  "order": 1,
  "content": {
    "title": { "value": "want + object + to V1", "translation": "хотіти, щоб хтось щось зробив" },
    "tense": "Present Simple",
    "blocks": [
      {
        "blockType": "text",
        "textRole": "description",
        "text": {
          "value": "Use <b>want</b> with a personal object to say what you would like someone else to do.",
          "translation": "Вживайте <b>want</b> з особовим додатком.",
        },
        "order": 0,
      },
      {
        "blockType": "pattern",
        "form": "affirmative",
        "markup": "I/We/They want [V1] (to him/her/them)",
        "order": 1,
      },
      {
        "blockType": "text",
        "textRole": "example",
        "text": { "value": "I want you to come.", "translation": "Я хочу, щоб ти прийшов." },
        "order": 2,
      },
    ],
  },
}
```

Source-only (no translations): omit `?lang=` and send plain `{ "value": ... }` objects with no `translation` key.

Response:

```jsonc
{
  "success": true,
  "id": "bfeca57a-1b2c-4d3e-8f4a-5b6c7d8e9f0a",
  "SegmentContentRowId": "ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b",
}
```

### `PATCH lesson/segment/:LessonId/reorder`

Reorder a lesson's segments. Items not listed keep their relative order after the listed ones; final order is re-indexed 0..n-1.

|             |                                                                            |
| ----------- | -------------------------------------------------------------------------- |
| **Body**    | `ReorderSegmentsDto` — `{ items: { SegmentId: uuid, order: int (≥0) }[] }` |
| **Returns** | — (`{ success }`)                                                          |

Request body:

```jsonc
{
  "items": [
    { "SegmentId": "962933cb-5f6a-4b7c-8d8e-9f0a1b2c3d4e", "order": 0 },
    { "SegmentId": "bfeca57a-1b2c-4d3e-8f4a-5b6c7d8e9f0a", "order": 1 },
  ],
}
```

```bash
curl -X PATCH http://localhost:3001/api/lesson/segment/627a51ca-d044-433f-8862-bf85cd7b3acd/reorder \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true }
```

### `PUT lesson/segment/:SegmentId?lang=`

**Full-replace edit** of a segment — the add/edit drawer sends the same body as `POST`, so this endpoint accepts the identical shape, **minus `SegmentKindKey`** (the kind is fixed by the existing segment and cannot change on edit). The segment's existing content subtree (wordlist/topic + all children) **and its translations** are deleted and recreated from the body in one transaction, so content-row ids change on every save.

|             |                                                                    |
| ----------- | ------------------------------------------------------------------ |
| **Query**   | `lang?` — single translation-language slug (same as create)        |
| **Body**    | `UpdateSegmentDto`                                                 |
| **Returns** | `id: string, SegmentContentRowId: string` (the new content row id) |

`UpdateSegmentDto`: `{ title?: string (≤255), description?: string, order?: int (≥0), content: object }` — same as `CreateSegmentDto` without `SegmentKindKey`. `content` and the `{ value, translation }` translation rules are exactly as in `POST lesson/segment/:LessonId` above (including the `?lang=` 400 rules and HTML sanitization).

To edit only the segment's own `title`/`description`, still send the full `content` (the drawer already has it loaded from the details read).

Request body (wordlist segment, replacing content + `uk` translations):

```bash
curl -X PUT "http://localhost:3001/api/lesson/segment/bfeca57a-1b2c-4d3e-8f4a-5b6c7d8e9f0a?lang=uk" \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

```jsonc
{
  "title": "Vocabulary",
  "description": "Words and phrases for making plans",
  "order": 0,
  "content": {
    "title": { "value": "Plans & invitations", "translation": "Плани та запрошення" },
    "entries": [
      {
        "lemma": { "value": "plan", "translation": "план" },
        "entryType": "word",
        "partOfSpeech": "noun",
        "order": 0,
      },
    ],
  },
}
```

Response:

```jsonc
{
  "success": true,
  "id": "bfeca57a-1b2c-4d3e-8f4a-5b6c7d8e9f0a",
  "SegmentContentRowId": "9f0a1b2c-3d4e-4f5a-8b6c-7d8e9f0a1b2c",
}
```

### `DELETE lesson/segment/:SegmentId`

Delete a segment and its content row (atomic; content children cascade).

|             |                   |
| ----------- | ----------------- |
| **Body**    | —                 |
| **Returns** | — (`{ success }`) |

```bash
curl -X DELETE http://localhost:3001/api/lesson/segment/962933cb-5f6a-4b7c-8d8e-9f0a1b2c3d4e
```

```jsonc
{ "success": true }
```

---

## WordlistController — base path `wordlist`

Read/update a wordlist and add entries. Used for lesson wordlists and (with `OwnerUserId`) user saved-words lists.

### `GET wordlist/:WordlistId?lang=`

The wordlist with all entries → examples + collocations, localized.

|             |                                 |
| ----------- | ------------------------------- |
| **Query**   | `lang?`                         |
| **Body**    | —                               |
| **Returns** | `wordlist: WordlistContentView` |

`WordlistContentView`: `{ id, title: L, description: L|null, entries: [{ id, order, lemma, entryType, partOfSpeech|null, v2|null, v3|null, transcription|null, audioUrl|null, definition: L, note: L|null, examples: [{ id, order, text: L }], collocations: [{ id, order, expression, explanation: L|null }] }] }` (`L` = localized field: `{ value: string, translation: string | null }`, see Conventions).

```bash
curl "http://localhost:3001/api/wordlist/ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b?lang=uk"
```

```jsonc
{
  "success": true,
  "wordlist": {
    "id": "ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b",
    "title": { "value": "Plans & invitations", "translation": null },
    "description": null,
    "entries": [
      {
        "id": "12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c",
        "order": 0,
        "lemma": "plan",
        "entryType": "word",
        "partOfSpeech": "noun",
        "v2": null,
        "v3": null,
        "transcription": null,
        "audioUrl": null,
        "definition": { "value": "plan", "translation": "план" },
        "note": null,
        "examples": [
          {
            "id": "86bf093a-4e5f-4a6b-8c7d-8e9f0a1b2c3d",
            "order": 0,
            "text": { "value": "We made a plan.", "translation": null },
          },
        ],
        "collocations": [],
      },
    ],
  },
}
```

### `PATCH wordlist/:WordlistId`

Update the wordlist's title/description.

|             |                                                                      |
| ----------- | -------------------------------------------------------------------- | ------- |
| **Body**    | `UpdateWordlistDto` — `{ title?: string (≤255), description?: string | null }` |
| **Returns** | `id: string`                                                         |

Request body:

```jsonc
{
  "title": "Plans, invitations & tickets",
}
```

```bash
curl -X PATCH http://localhost:3001/api/wordlist/ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b" }
```

### `POST wordlist/entry/:WordlistId`

Add a single entry to a wordlist. New entries go to the end.

|             |                  |
| ----------- | ---------------- |
| **Body**    | `CreateEntryDto` |
| **Returns** | `id: string`     |

`CreateEntryDto`: `{ lemma: string (≤255, required), entryType?: 'word'|'phrase', partOfSpeech?: PartOfSpeech ('noun'|'verb'|'adjective'|'adverb'|'preposition'|'pronoun'|'conjunction'|'interjection')|null, v2?, v3?, transcription? (≤255), audioUrl? (≤512), note?, order?: int (≥0) }`.

Request body:

```jsonc
{
  "lemma": "a round trip ticket",
  "entryType": "phrase",
  "partOfSpeech": "noun",
}
```

```bash
curl -X POST http://localhost:3001/api/wordlist/entry/ab23f09a-2c3d-4e5f-8a6b-7c8d9e0f1a2b \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "338a5fed-3b4c-4d5e-8f6a-7b8c9d0e1f2a" }
```

---

## WordlistEntryController — base path `wordlist/entry`

Update/delete a single entry and attach examples/collocations.

### `PATCH wordlist/entry/:EntryId`

Update an entry's fields.

|             |                                                               |
| ----------- | ------------------------------------------------------------- |
| **Body**    | `UpdateEntryDto` — all `CreateEntryDto` fields, each optional |
| **Returns** | `id: string`                                                  |

Request body:

```jsonc
{
  "transcription": "plæn",
  "partOfSpeech": "noun",
}
```

```bash
curl -X PATCH http://localhost:3001/api/wordlist/entry/12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c" }
```

### `DELETE wordlist/entry/:EntryId`

Delete an entry (examples + collocations cascade).

|             |                   |
| ----------- | ----------------- |
| **Body**    | —                 |
| **Returns** | — (`{ success }`) |

```bash
curl -X DELETE http://localhost:3001/api/wordlist/entry/12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c
```

```jsonc
{ "success": true }
```

### `POST wordlist/entry/:EntryId/example`

Add an example sentence to an entry.

|             |                                                                      |
| ----------- | -------------------------------------------------------------------- |
| **Body**    | `CreateExampleDto` — `{ text: string (required), order?: int (≥0) }` |
| **Returns** | `id: string`                                                         |

Request body:

```jsonc
{
  "text": "We made a plan for the weekend.",
}
```

```bash
curl -X POST http://localhost:3001/api/wordlist/entry/12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c/example \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "86bf093a-4e5f-4a6b-8c7d-8e9f0a1b2c3d" }
```

### `POST wordlist/entry/:EntryId/collocation`

Add a collocation to an entry.

|             |                                                                                       |
| ----------- | ------------------------------------------------------------------------------------- | ------------------------- |
| **Body**    | `CreateCollocationDto` — `{ expression: string (≤255, required), explanation?: string | null, order?: int (≥0) }` |
| **Returns** | `id: string`                                                                          |

Request body:

```jsonc
{
  "expression": "make a plan",
  "explanation": "Use \"make\", not \"do\".",
}
```

```bash
curl -X POST http://localhost:3001/api/wordlist/entry/12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c/collocation \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "d98b27b1-4c5d-4e6f-8a7b-8c9d0e1f2a3b" }
```

---

## GrammarTopicController — base path `grammar-topic`

Read/update a grammar topic and add blocks. `text` blocks are HTML-sanitized on write; `pattern` blocks have their `markup` parsed into `parsedMarkup` on write.

### `GET grammar-topic/:GrammarTopicId?lang=`

The topic with all blocks + payloads, localized.

|             |                                    |
| ----------- | ---------------------------------- |
| **Query**   | `lang?`                            |
| **Body**    | —                                  |
| **Returns** | `grammarTopic: GrammarContentView` |

`GrammarContentView`: `{ id, title: L|null, tense: string|null, blocks: BlockView[] }` (`L` = localized field, see Conventions).
`BlockView` (text): `{ id, blockType:"text", order, textRole, text: L }`.
`BlockView` (pattern): `{ id, blockType:"pattern", order, form, markup, parsedMarkup: Token[] }`.

`Token` is one of: `{type:"static",text}`, `{type:"options",options:string[]}`, `{type:"slot",slot}`, `{type:"optional",tokens:Token[]}`.

```bash
curl "http://localhost:3001/api/grammar-topic/2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f?lang=uk"
```

```jsonc
{
  "success": true,
  "grammarTopic": {
    "id": "2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f",
    "title": { "value": "want + object + to V1", "translation": null },
    "tense": "Present Simple",
    "blocks": [
      {
        "id": "135daabb-7b8c-4d9e-8f0a-1b2c3d4e5f6a",
        "blockType": "text",
        "order": 0,
        "textRole": "description",
        "text": { "value": "Use <b>want</b> with a personal object.", "translation": null },
      },
      {
        "id": "55142c3d-8c9d-4e0f-8a1b-2c3d4e5f6a7b",
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
    ],
  },
}
```

### `PATCH grammar-topic/:GrammarTopicId`

Update the topic's title/tense.

|             |                                      |
| ----------- | ------------------------------------ | --------------------------- | ------------- |
| **Body**    | `UpdateTopicDto` — `{ title?: string | null (≤255), tense?: string | null (≤64) }` |
| **Returns** | `id: string`                         |

Request body:

```jsonc
{
  "tense": "Present Simple",
}
```

```bash
curl -X PATCH http://localhost:3001/api/grammar-topic/2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f" }
```

### `POST grammar-topic/block/:GrammarTopicId`

Add a block to the topic. `blockType` selects which payload fields are required. New blocks go to the end.

|             |                                 |
| ----------- | ------------------------------- |
| **Body**    | `AddBlockDto`                   |
| **Returns** | `id: string` (the new block id) |

`AddBlockDto`: `{ blockType: "text"|"pattern", order?: int (≥0), ...payload }`.

- text payload: `textRole: "description"|"example"`, `text: string`.
- pattern payload: `form: string (≤64)`, `markup: string`.

Request body — text block:

```jsonc
{
  "blockType": "text",
  "textRole": "example",
  "text": "I want you to come.",
}
```

Request body — pattern block:

```jsonc
{
  "blockType": "pattern",
  "form": "negative",
  "markup": "I/We/They do not want [V1] (to him/her/them)",
}
```

```bash
curl -X POST http://localhost:3001/api/grammar-topic/block/2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true, "id": "2e5c5409-5d6e-4f7a-8b8c-9d0e1f2a3b4c" }
```

---

## GrammarBlockController — base path `grammar-block`

Update/delete a block and reorder blocks within a topic.

### `PATCH grammar-block/reorder/:GrammarTopicId`

Reorder the topic's blocks. Items not listed keep their relative order after the listed ones; final order is re-indexed 0..n-1.

|             |                                                                        |
| ----------- | ---------------------------------------------------------------------- |
| **Body**    | `ReorderBlocksDto` — `{ items: { BlockId: uuid, order: int (≥0) }[] }` |
| **Returns** | — (`{ success }`)                                                      |

Request body:

```jsonc
{
  "items": [
    { "BlockId": "55142c3d-8c9d-4e0f-8a1b-2c3d4e5f6a7b", "order": 0 },
    { "BlockId": "135daabb-7b8c-4d9e-8f0a-1b2c3d4e5f6a", "order": 1 },
  ],
}
```

```bash
curl -X PATCH http://localhost:3001/api/grammar-block/reorder/2639f4ec-6a7b-4c8d-8e9f-0a1b2c3d4e5f \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true }
```

### `PATCH grammar-block/:BlockId`

Update a block's payload. The handler dispatches on the block's existing `blockType`; send only the fields you want changed. `text` is re-sanitized; `markup` is re-parsed.

|             |                                                |
| ----------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| **Body**    | `UpdateBlockDto` — `{ textRole?: "description" | "example", text?: string, form?: string (≤64), markup?: string }` |
| **Returns** | — (`{ success }`)                              |

Request body — update a text block:

```jsonc
{
  "text": "Use <b>want</b> + object + <i>to</i> + V1.",
}
```

Request body — update a pattern block's markup (re-parsed server-side):

```jsonc
{
  "markup": "Do I/We/They want [V1] (to him/her/them)?",
}
```

```bash
curl -X PATCH http://localhost:3001/api/grammar-block/135daabb-7b8c-4d9e-8f0a-1b2c3d4e5f6a \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{ "success": true }
```

### `DELETE grammar-block/:BlockId`

Delete a block (its 1:1 payload cascades).

|             |                   |
| ----------- | ----------------- |
| **Body**    | —                 |
| **Returns** | — (`{ success }`) |

```bash
curl -X DELETE http://localhost:3001/api/grammar-block/135daabb-7b8c-4d9e-8f0a-1b2c3d4e5f6a
```

```jsonc
{ "success": true }
```

---

## TranslationController — base path `translation`

Generic translation store for any translatable field on any entity. Admin-only. The source language (`en`) lives on the entity column — do **not** write `en` translations here (they are ignored on read).

### `GET translation?entityType=&EntityId=&languageCode=`

List translations, filtered.

|             |                                                                |
| ----------- | -------------------------------------------------------------- |
| **Query**   | `entityType?` (≤64), `EntityId?` (uuid), `languageCode?` (≤10) |
| **Body**    | —                                                              |
| **Returns** | `items: TranslationItem[]`                                     |

`TranslationItem`: `{ id, entityType, EntityId, field, languageCode, value, version, createdAt, updatedAt }`.

```bash
curl "http://localhost:3001/api/translation?entityType=wordlist_entry&EntityId=12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c"
```

```jsonc
{
  "success": true,
  "items": [
    {
      "id": "24f8c96a-6e7f-4a8b-8c9d-0e1f2a3b4c5d",
      "entityType": "wordlist_entry",
      "EntityId": "12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c",
      "field": "definition",
      "languageCode": "uk",
      "value": "план",
      "version": 1,
      "createdAt": "2026-07-20T21:48:23.945Z",
      "updatedAt": "2026-07-20T21:48:23.945Z",
    },
  ],
}
```

### `POST translation`

Upsert a translation slot, keyed by `(entityType, EntityId, field, languageCode)`. Bumps `version` on update.

|             |                                |
| ----------- | ------------------------------ |
| **Body**    | `UpsertTranslationDto`         |
| **Returns** | `translation: TranslationItem` |

`UpsertTranslationDto`: `{ entityType: string (≤64, required), EntityId: uuid, field: string (≤64, required), languageCode: string (≤10, required), value: string (required) }`.

Common `entityType` values: `lesson`, `lesson_segment`, `segment_type`, `segment_kind`, `wordlist`, `wordlist_entry`, `wordlist_entry_example`, `wordlist_entry_collocation`, `grammar_topic`, `grammar_block_text`, `grammar_block_pattern`.
Common `field` values: `title`, `subtitle`, `description`, `name`, `definition`, `note`, `text`, `explanation`.

Request body:

```jsonc
{
  "entityType": "wordlist_entry",
  "EntityId": "12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c",
  "field": "definition",
  "languageCode": "uk",
  "value": "план",
}
```

```bash
curl -X POST http://localhost:3001/api/translation \
  -H 'Content-Type: application/json' \
  -d {BODY}
```

Response:

```jsonc
{
  "success": true,
  "translation": {
    "id": "24f8c96a-6e7f-4a8b-8c9d-0e1f2a3b4c5d",
    "entityType": "wordlist_entry",
    "EntityId": "12b6eafb-3d4e-4f5a-8b6c-7d8e9f0a1b2c",
    "field": "definition",
    "languageCode": "uk",
    "value": "план",
    "version": 1,
    "createdAt": "2026-07-20T21:48:23.945Z",
    "updatedAt": "2026-07-20T21:48:23.945Z",
  },
}
```

---

## Related — Course language fields

`CourseController` is outside this doc's core scope, but the lesson-details `?lang=` behavior is driven by two language fields now carried on every course and exposed in both course read responses:

- **`GET /course`** (list) → each `CourseListItem` includes `sourceLanguageCode` and `translationLanguageCodes`.
- **`GET /course/:CourseId`** (details) → `AdminCourseDetails` includes both fields.

| field                      | type       | notes                                                                                                                                                 |
| -------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceLanguageCode`       | `string`   | the language the course teaches; untranslated lesson fields fall back to it (default `en`)                                                            |
| `translationLanguageCodes` | `string[]` | languages the course may be translated into; the lesson-details `?lang=` must be one of these (default `[]`, existing courses backfilled to `['uk']`) |

```jsonc
// GET /course/7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f → course details (relevant fields)
{
  "success": true,
  "course": {
    "id": "7d302be1-9c1a-4f2b-8e3d-5a6b7c8d9e0f",
    "name": "English A2 — Daily Life",
    "sourceLanguageCode": "en",
    "translationLanguageCodes": ["uk"],
    "...": "...",
  },
}
```

---

## Quick reference — all endpoints

| Controller              | Method | Path                                    |
| ----------------------- | ------ | --------------------------------------- |
| LessonController        | GET    | `course/lesson/:CourseId/list`          |
| LessonController        | GET    | `course/lesson/:LessonId/details`       |
| LessonController        | POST   | `course/lesson/:CourseId`               |
| LessonController        | PATCH  | `course/lesson/:CourseId/reorder`       |
| LessonController        | PATCH  | `course/lesson/:LessonId/status`        |
| LessonController        | DELETE | `course/lesson/:LessonId`               |
| LessonSegmentController | POST   | `lesson/segment/:LessonId?lang=`        |
| LessonSegmentController | PATCH  | `lesson/segment/:LessonId/reorder`      |
| LessonSegmentController | PUT    | `lesson/segment/:SegmentId?lang=`       |
| LessonSegmentController | DELETE | `lesson/segment/:SegmentId`             |
| WordlistController      | GET    | `wordlist/:WordlistId`                  |
| WordlistController      | PATCH  | `wordlist/:WordlistId`                  |
| WordlistController      | POST   | `wordlist/entry/:WordlistId`            |
| WordlistEntryController | PATCH  | `wordlist/entry/:EntryId`               |
| WordlistEntryController | DELETE | `wordlist/entry/:EntryId`               |
| WordlistEntryController | POST   | `wordlist/entry/:EntryId/example`       |
| WordlistEntryController | POST   | `wordlist/entry/:EntryId/collocation`   |
| GrammarTopicController  | GET    | `grammar-topic/:GrammarTopicId`         |
| GrammarTopicController  | PATCH  | `grammar-topic/:GrammarTopicId`         |
| GrammarTopicController  | POST   | `grammar-topic/block/:GrammarTopicId`   |
| GrammarBlockController  | PATCH  | `grammar-block/reorder/:GrammarTopicId` |
| GrammarBlockController  | PATCH  | `grammar-block/:BlockId`                |
| GrammarBlockController  | DELETE | `grammar-block/:BlockId`                |
| TranslationController   | GET    | `translation`                           |
| TranslationController   | POST   | `translation`                           |
