# Lesson Domain — Implementation Stories

Companion to [`LESSON_DOMAIN_ARCHITECTURE.md`](./LESSON_DOMAIN_ARCHITECTURE.md). This file breaks the architecture into PR-sized stories grouped by phase. Each story has a product/why section up top and an engineering breakdown below.

**Scope:** backend (`apps/api`) only. Frontend usage is noted per story where it shapes the contract; frontend stories themselves are out of scope.

**Project conventions to follow on every story** (from `apps/api`'s [CLAUDE.md](./CLAUDE.md)):

- Only `{name}.module.ts` at module root; everything else under `http/controllers`, `http/dto`, `services`, `repositories`, `structs/`
- FK columns and TypeORM relations start uppercase (`LessonId`, not `lessonId`)
- Services accept input interfaces from `structs/`, never DTO classes; DTOs `implement` the interface
- Every endpoint returns a response DTO extending `BaseResponseDto`; never return entities directly
- Migrations follow `<timestamp>-create-<name>.ts` under `apps/api/src/database/migrations/`; both `up()` and `down()` required

**How to read each story:**

- **Story** — product-facing one-liner.
- **Why** — what user or system need this unblocks.
- **Engineering breakdown** — concrete files, migrations, endpoints, acceptance criteria, dependencies.

**Status legend:** `🔲 not started` · `🟡 in progress` · `✅ done`

---

## Phase 1 — Lesson module

### S1.1 — Create the Lesson module skeleton 🔲

**Story:** An admin can create, list, view, edit, and delete lessons under a course via the API.

**Why:** Courses exist but have no lessons today. This unlocks all later phases — every segment, every wordlist, every grammar topic belongs to a lesson.

**Engineering breakdown:**

- The `Lesson` entity and migration already exist at `apps/api/src/database/entities/lesson.entity.ts` and `apps/api/src/database/migrations/1776100628000-create-lesson.ts`. **No new migration.** Verify the columns match §2.3 of the architecture doc (id, CourseId, title, subtitle, description, order, status, timestamps).
- Create module folder `apps/api/src/modules/lesson/`:
  - `lesson.module.ts` — imports `CourseModule` (for FK reference) and exports `LessonService`
  - `repositories/lesson.repository.ts` — extends `BaseRepository<Lesson>`; provides `findListPaginated`, `getOneByIdWithRelationsOrFail`, `deleteWithSegmentsLater` (placeholder, since segments don't exist yet)
  - `services/lesson.service.ts` — `createLesson`, `updateLesson`, `getLessonById`, `deleteLesson`, `listLessons` (paginated, optional `CourseId` filter)
  - `http/controllers/lesson.controller.ts` — routes per §6.1 of the architecture doc:
    - `GET    /lesson?CourseId=`
    - `POST   /lesson`
    - `GET    /lesson/:LessonId`
    - `PATCH  /lesson/:LessonId`
    - `DELETE /lesson/:LessonId`
  - `http/dto/` — `create-lesson.dto.ts`, `update-lesson.dto.ts`, `list-lessons-query.dto.ts`, `lesson-response.dto.ts`, `lesson-list-response.dto.ts`, `create-lesson-response.dto.ts`, `update-lesson-response.dto.ts`
  - `structs/` — `lesson-status.enum.ts` (`Draft | Published | Archived`), `create-lesson-params.interface.ts`, `update-lesson-params.interface.ts`, `list-lessons-params.interface.ts`, `lesson-list-item.constructor.ts`, `lesson-details.constructor.ts`
- Register `LessonModule` in `apps/api/src/app.module.ts`.

**Frontend context:** The existing admin app shows lessons under a course as mock data (`CourseLessonsArea.section.tsx`). After this story, the existing `useCoursesList`-style hooks pattern can be mirrored as `useLessonsList(courseId)` to replace the mocks. Response shape: `{ items: LessonListItem[] }` for list, `{ lesson: LessonDetails }` for single, both extending `BaseResponseDto`.

**Acceptance:**

- All 5 endpoints respond with the documented shape.
- `GET /lesson/:LessonId` of a lesson with no segments returns a `lesson` object with `segments: []` (the field is empty for now; populated in Phase 3).
- Deleting a lesson cascades (when segments are added later, the FK CASCADE handles it).
- Lint and tests pass; `npm run dev:api` boots without errors.

**Depends on:** nothing — `Course` already exists.

---

## Phase 2 — Localization core

### S2.1 — Language lookup table 🔲

**Story:** The system knows which languages it supports and can list them to the admin/UI.

**Why:** Without this, there's nothing to validate translation `languageCode` values against and the admin UI can't render a language picker.

**Engineering breakdown:**

- Migration `create-language.ts`:
  ```sql
  CREATE TABLE "Language" (
    "code"        VARCHAR(10) PRIMARY KEY,
    "name"        VARCHAR(64) NOT NULL,
    "nativeName"  VARCHAR(64) NOT NULL,
    "isActive"    BOOLEAN NOT NULL DEFAULT TRUE
  );
  ```
- Seed (in the same migration's `up()` or a separate seed file): English + Ukrainian only for now (per architecture decision):
  ```sql
  INSERT INTO "Language" (code, name, "nativeName") VALUES
    ('en', 'English',   'English'),
    ('uk', 'Ukrainian', 'Українська');
  ```
- Entity: `apps/api/src/database/entities/language.entity.ts`.
- No module yet — `Language` is read inside `LocalizationModule` (S2.2) and exposed via a thin endpoint there.

**Acceptance:**

- Migration runs and rolls back cleanly.
- Seed produces exactly 2 rows on a fresh DB.

**Depends on:** S1.1 (so the migration ordering is well-defined; technically independent).

---

### S2.2 — Translation table + generic CRUD 🔲

**Story:** Any translatable field on any entity can carry translations for any active language. Admins can add or update translations through a single endpoint.

**Why:** This is the keystone of the localization strategy. Once it exists, every later content table just attaches translations via `(entityType, EntityId, field, languageCode)` — no schema work per language.

**Engineering breakdown:**

- Migration `create-translation.ts`:
  ```sql
  CREATE TABLE "Translation" (
    "id"            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "entityType"    VARCHAR(64) NOT NULL,
    "EntityId"      UUID NOT NULL,
    "field"         VARCHAR(64) NOT NULL,
    "languageCode"  VARCHAR(10) NOT NULL REFERENCES "Language"(code) ON DELETE RESTRICT,
    "value"         TEXT NOT NULL,
    "version"       INT NOT NULL DEFAULT 1,
    "createdAt"     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt"     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE ("entityType", "EntityId", "field", "languageCode")
  );
  CREATE INDEX "idx_translation_entity" ON "Translation" ("entityType", "EntityId");
  ```
- Entity: `apps/api/src/database/entities/translation.entity.ts`.
- New module `apps/api/src/modules/localization/`:
  - `localization.module.ts` — exports `TranslationService` and `LocalizedResolver`
  - `repositories/translation.repository.ts` — `upsert(input)`, `findFor(entityType, ids[], languageCodes[])`, `deleteFor(entityType, id)` (used when content rows are deleted to keep the table tidy)
  - `services/translation.service.ts` — wraps repository; handles the `version` bump on update
  - `http/controllers/translation.controller.ts`:
    - `GET  /translation?entityType=&EntityId=&languageCode=`
    - `POST /translation` — upsert by `(entityType, EntityId, field, languageCode)`
  - `http/controllers/language.controller.ts` — `GET /language` returns `{ items: Language[] }` (for the admin language picker)
  - `structs/localized-value.constructor.ts` — `{ value: string, lang: string }` value object used in every response

**Acceptance:**

- `POST /translation` upserts and bumps `version` on update.
- `GET /translation?entityType=lesson&EntityId=<id>&languageCode=uk` returns the matching rows.
- Trying to write a translation for a language not in `Language` returns 4xx (FK constraint enforces).

**Depends on:** S2.1.

---

### S2.3 — `LocalizedResolver` helper + Lesson integration 🔲

**Story:** Lesson reads return localized titles/descriptions in the requested language (or fall back to English).

**Why:** Translation rows exist after S2.2, but nothing reads them yet. This story wires the resolver into the only entity that's translatable today (Lesson) so the pattern is proven before Phase 3 adds more entities.

**Engineering breakdown:**

- `apps/api/src/modules/localization/services/localized-resolver.service.ts`:
  - `resolve(batch: { entityType, EntityId, field }[], languageCodes: string[]): Map<key, LocalizedValue>`
  - Issues **exactly one** `SELECT * FROM "Translation" WHERE ("entityType","EntityId") IN (...) AND "languageCode" IN (...)`.
  - Merges per the fallback chain in §3.3 of the architecture doc: requested → regional fallback (`uk-UA` → `uk`) → explicit chain → source.
  - Returns a `LocalizedValue` (`{ value, lang }`) per `(entityType, EntityId, field)` so callers can render the `lang` badge.
- Middleware or interceptor `apps/api/src/common/http/middleware/accept-language.middleware.ts` that parses `Accept-Language` header **and** `?lang=uk,en` query into a normalized array. Either form is accepted per §6.2.
- Update `LessonModule` from S1.1:
  - Import `LocalizationModule`.
  - In `lesson-details.constructor.ts` and `lesson-list-item.constructor.ts`, the constructor takes an extra `resolver: LocalizedResolver` argument and wraps `title`, `subtitle`, `description` as `LocalizedValue` instead of plain strings.
  - Update the response DTO types to reflect the `{ value, lang }` shape.

**Frontend context:** Clients send `Accept-Language: uk,en` or `?lang=uk,en`. Every translatable string in the response comes back as `{ value, lang }`, not a bare string. The web app needs a `<LocalizedText>` component (or a render helper) that reads `.value` and optionally shows a "shown in English" badge when `lang !== requested`.

**Acceptance:**

- Adding a `('lesson', LessonId, 'title', 'uk')` row via `POST /translation`, then `GET /lesson/:LessonId?lang=uk`, returns `title: { value: '<ukrainian>', lang: 'uk' }`.
- Without a Ukrainian row, the same request returns `title: { value: '<english source>', lang: 'en' }`.
- The `resolver.resolve()` call for a single lesson read hits `Translation` exactly once (verify with query logging).

**Depends on:** S1.1, S2.2.

---

## Phase 3 — Segment catalog + LessonSegment + handler registry

### S3.1 — `SegmentType` + `SegmentKind` catalog tables 🔲

**Story:** The admin UI can list the segment types and kinds available for authoring (currently empty until later stories register concrete kinds).

**Why:** Makes the catalog data-driven from day one. Admin dropdowns query the DB; adding a new kind later is one seed row, no UI rebuild.

**Engineering breakdown:**

- Migrations:
  - `create-segment-type.ts` — `id, code (unique), name, isActive, createdAt, updatedAt`. No `order` column (per architecture decision).
  - `create-segment-kind.ts` — `id, SegmentTypeId (fk CASCADE), code (unique), name, tableName, isActive, createdAt, updatedAt`. No `order` column.
- Entities: `segment-type.entity.ts`, `segment-kind.entity.ts`.
- New module `apps/api/src/modules/segment-catalog/`:
  - `segment-catalog.module.ts`
  - `repositories/segment-type.repository.ts`, `segment-kind.repository.ts`
  - `services/segment-catalog.service.ts` — `getType(code)`, `getKind(code)`, `listActiveTypes()`, `listActiveKinds(typeCode?)`
  - `services/segment-catalog-seeder.service.ts` — `onModuleInit` lifecycle hook upserts rows from a code-side constant `SEGMENT_KIND_REGISTRY` (initially empty; phases 4 and 5 push entries in)
  - `http/controllers/segment-catalog.controller.ts`:
    - `GET /segment-type` → `{ items: SegmentType[] }`
    - `GET /segment-kind?SegmentTypeId=` → `{ items: SegmentKind[] }`
  - `structs/` — DTOs, constructors, `SEGMENT_KIND_REGISTRY` token + interface

**Frontend context:** The admin "Add segment to lesson" dialog calls `GET /segment-type` then `GET /segment-kind?SegmentTypeId=...`. After Phase 4 and 5 ship, the dropdown shows `vocabulary.wordlist` and `grammar.topic` automatically with no frontend code change.

**Acceptance:**

- Migrations + seeder run; on a fresh DB the catalog tables are empty (no kinds registered yet) and the endpoints return `{ items: [] }`.
- Seeder is idempotent — re-running `onModuleInit` doesn't duplicate rows.

**Depends on:** S1.1 (for migration ordering).

---

### S3.2 — `LessonSegment` table + kind handler registry 🔲

**Story:** A lesson can hold ordered, typed segments. Concrete kinds register themselves; the segment service knows how to orchestrate creation across the segment row and the kind's content row.

**Why:** Defines the polymorphic glue. Phases 4 and 5 plug into it; without this story they have nowhere to attach.

**Engineering breakdown:**

- Migration `create-lesson-segment.ts`:
  - Columns: `id, LessonId (fk CASCADE), SegmentKindId (fk RESTRICT), SegmentContentRowId UUID, title nullable, description nullable, order, createdAt, updatedAt`.
  - Indexes: `(LessonId, order)`, `(SegmentKindId, SegmentContentRowId)` for reverse lookup.
  - **No FK on `SegmentContentRowId`** — polymorphic; integrity enforced by the service transaction.
- Entity: `lesson-segment.entity.ts`.
- New module `apps/api/src/modules/lesson-segment/`:
  - `lesson-segment.module.ts` — depends on `SegmentCatalogModule`
  - `repositories/lesson-segment.repository.ts`
  - `services/kind-handler-registry.service.ts`:
    - `register(code: string, handler: KindHandler): void`
    - `get(code: string): KindHandler`
    - Throws if `code` isn't registered.
  - `services/lesson-segment.service.ts`:
    - `addSegment(LessonId, SegmentKindId, content, order)`:
      1. Resolves the `SegmentKind`, looks up the handler in the registry.
      2. In one transaction: handler.createContent(content) → insert `LessonSegment` row with `SegmentKindId` + `SegmentContentRowId`.
    - `updateSegment(SegmentId, partial)`, `deleteSegment(SegmentId)`, `reorderSegments(LessonId, orderedIds[])`
    - On delete, also calls handler.deleteContent so orphans don't accumulate.
  - `structs/kind-handler.interface.ts`:
    ```ts
    export interface KindHandler<TCreate, TLoad, TSerialized> {
      createContent(input: TCreate): Promise<{ id: string }>;
      loadContent(id: string, resolver: LocalizedResolver, langs: string[]): Promise<TLoad>;
      serializeContent(loaded: TLoad): TSerialized;
      deleteContent(id: string): Promise<void>;
    }
    ```
  - `http/controllers/lesson-segment.controller.ts`:
    - `POST   /lesson/:LessonId/segment` — body: `{ SegmentKindId, order, content }`
    - `PATCH  /lesson-segment/:SegmentId/reorder` — body: `{ orderedIds: string[] }`
    - `PATCH  /lesson-segment/:SegmentId`
    - `DELETE /lesson-segment/:SegmentId`
- Update `Lesson` read response: `GET /lesson/:LessonId` now joins `LessonSegment` rows, and for each segment calls `handler.loadContent` to populate the typed content. Empty handler registry means each segment shows as `{ segmentKind, order, title, content: null }` — populated once Phase 4 and 5 register their handlers.

**Acceptance:**

- `POST /lesson/:LessonId/segment` with an unregistered `SegmentKindId` returns 4xx with a clear error.
- Deleting a `LessonSegment` deletes its associated content row in the same transaction.
- `(SegmentKindId, SegmentContentRowId)` index lets a reverse query ("which segment uses this Wordlist?") return in one indexed seek.

**Depends on:** S1.1, S3.1.

---

## Phase 4 — Vocabulary segment + Wordlist kind

### S4.1 — `Wordlist` and `WordlistEntry` tables 🔲

**Story:** Admins can store a wordlist (with `OwnerUserId` left `NULL` for lesson use) and add entries to it. Each entry holds its own lemma, POS, verb forms, transcription, audio URL, and per-entry note.

**Why:** The data layer for the vocabulary segment. No `Word` global table — each entry is self-contained per the architecture decision.

**Engineering breakdown:**

- Migrations:
  - `create-wordlist.ts`:
    ```sql
    CREATE TABLE "Wordlist" (
      "id"           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "title"        VARCHAR(255) NOT NULL,
      "description"  TEXT,
      "OwnerUserId"  UUID REFERENCES "User"(id) ON DELETE CASCADE,
      "createdAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      "updatedAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    CREATE INDEX "idx_wordlist_OwnerUserId" ON "Wordlist" ("OwnerUserId");
    ```
  - `create-wordlist-entry.ts`:
    ```sql
    CREATE TABLE "WordlistEntry" (
      "id"             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "WordlistId"     UUID NOT NULL REFERENCES "Wordlist"(id) ON DELETE CASCADE,
      "lemma"          VARCHAR(255) NOT NULL,
      "entryType"      VARCHAR(8) NOT NULL DEFAULT 'word'
                       CHECK ("entryType" IN ('word','phrase')),
      "partOfSpeech"   VARCHAR(32),
      "v2"             VARCHAR(255),
      "v3"             VARCHAR(255),
      "transcription"  VARCHAR(255),
      "audioUrl"       VARCHAR(512),
      "order"          INT NOT NULL DEFAULT 0,
      "note"           TEXT,
      "createdAt"      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      "updatedAt"      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    CREATE INDEX "idx_wordlist_entry_WordlistId_order" ON "WordlistEntry" ("WordlistId", "order");
    CREATE INDEX "idx_wordlist_entry_lemma_lower"      ON "WordlistEntry" (lower("lemma"));
    ```
- Entities: `wordlist.entity.ts`, `wordlist-entry.entity.ts`.
- `apps/api/src/modules/vocabulary/wordlist.module.ts` (skeleton only — controllers added in S4.3).

**Acceptance:**

- Migrations run and roll back cleanly.
- CHECK constraint rejects `entryType = 'sentence'`.
- Inserting two entries with the same `(WordlistId, lemma)` succeeds — duplicates are explicitly allowed per the design.

**Depends on:** S3.2 (so the FK from `LessonSegment.SegmentContentRowId` works conceptually, though there's no DB-level FK).

---

### S4.2 — `WordlistEntryExample` + `WordlistEntryCollocation` tables 🔲

**Story:** Each wordlist entry can carry multiple example sentences and multiple collocations.

**Why:** Examples and collocations are core teaching material. Splitting them into their own tables (instead of arrays on the entry) keeps each row translatable and indexable.

**Engineering breakdown:**

- Migrations:
  - `create-wordlist-entry-example.ts`:
    ```sql
    CREATE TABLE "WordlistEntryExample" (
      "id"               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "WordlistEntryId"  UUID NOT NULL REFERENCES "WordlistEntry"(id) ON DELETE CASCADE,
      "text"             TEXT NOT NULL,
      "order"            INT NOT NULL DEFAULT 0
    );
    CREATE INDEX "idx_wle_example_entry_order" ON "WordlistEntryExample" ("WordlistEntryId", "order");
    ```
  - `create-wordlist-entry-collocation.ts`:
    ```sql
    CREATE TABLE "WordlistEntryCollocation" (
      "id"               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "WordlistEntryId"  UUID NOT NULL REFERENCES "WordlistEntry"(id) ON DELETE CASCADE,
      "expression"       VARCHAR(255) NOT NULL,
      "explanation"      TEXT,
      "order"            INT NOT NULL DEFAULT 0
    );
    CREATE INDEX "idx_wle_collocation_entry_order" ON "WordlistEntryCollocation" ("WordlistEntryId", "order");
    ```
- Entities: `wordlist-entry-example.entity.ts`, `wordlist-entry-collocation.entity.ts`.

**Acceptance:**

- Migrations run and roll back cleanly.
- Deleting a `WordlistEntry` cascades to its examples and collocations.

**Depends on:** S4.1.

---

### S4.3 — Wordlist kind handler + lesson-side authoring endpoints 🔲

**Story:** An admin can attach a wordlist to a lesson, add/edit/delete entries inline, and add examples and collocations to each entry. The lesson read endpoint returns the wordlist with all entries, examples, and collocations localized.

**Why:** Wires the Wordlist tables into the `LessonSegment` registry and exposes the admin-facing CRUD. After this story, vocabulary segments are fully usable end-to-end.

**Engineering breakdown:**

- Inside `apps/api/src/modules/vocabulary/`:
  - `templates/wordlist/wordlist.repository.ts` — bundle the wordlist + entries + examples + collocations joins in one query (this is the response constructor's data source)
  - `templates/wordlist/wordlist-kind-handler.ts` — implements `KindHandler`:
    - `createContent({ title, description, entries })` — inserts wordlist + entries in a transaction; entries with example/collocation children get those too
    - `loadContent(id, resolver, langs)` — fetches the tree, resolves translations for `('wordlist', id, ...)`, `('wordlist_entry', id, ...)`, `('wordlist_entry_example', id, ...)`, `('wordlist_entry_collocation', id, ...)`
    - `serializeContent(loaded)` — produces the response shape from §6.3 of the architecture doc
    - `deleteContent(id)` — deletes the wordlist row; FK cascade handles entries/examples/collocations
  - `templates/wordlist/register.ts` — calls `kindHandlerRegistry.register('vocabulary.wordlist', new WordlistKindHandler(...))` and pushes a `SEGMENT_KIND_REGISTRY` entry so the seeder upserts the catalog row
  - `services/wordlist-entry.service.ts` — `createEntry`, `updateEntry`, `deleteEntry`, `reorderEntries`. No `findOrCreate`, no dedup.
  - `services/wordlist-entry-example.service.ts` and `wordlist-entry-collocation.service.ts` — straightforward CRUD.
  - `http/controllers/wordlist.controller.ts`:
    - `GET    /wordlist/:WordlistId` → full tree
    - `PATCH  /wordlist/:WordlistId`
    - `POST   /wordlist/:WordlistId/entry` → body inline (lemma, entryType, POS, etc.)
  - `http/controllers/wordlist-entry.controller.ts`:
    - `PATCH  /wordlist-entry/:EntryId`
    - `DELETE /wordlist-entry/:EntryId`
    - `POST   /wordlist-entry/:EntryId/example`
    - `POST   /wordlist-entry/:EntryId/collocation`
  - Wire `register.ts` into `WordlistModule`'s providers (or `forFeature` style) so the handler registration happens at module init.

**Frontend context:**

- Authoring: admin clicks "Add segment" on a lesson → selects "Vocabulary > Wordlist" → fills in title + first entry → `POST /lesson/:LessonId/segment` with `{ SegmentKindId: 'sk-wl', order: N, content: { title, entries: [{ lemma, entryType, partOfSpeech, ... }] } }`. Subsequent entries via `POST /wordlist/:id/entry`. Examples and collocations via `/wordlist-entry/:id/example` and `/collocation`.
- Reading: lesson page receives the wordlist segment expanded inline; the entry response shape includes `lemma, entryType, partOfSpeech, v2, v3, transcription, audioUrl, order, note, definition: { value, lang }, examples: [{ id, text: { value, lang } }], collocations: [{ id, expression, explanation: { value, lang } }]`.

**Acceptance:**

- Author flow: `POST /lesson/.../segment` with the wordlist payload, then `GET /lesson/...` returns the lesson with the wordlist segment populated.
- Adding a Ukrainian translation via `POST /translation` for `('wordlist_entry', <id>, 'definition', 'uk')` then `GET /lesson/...?lang=uk,en` returns `definition: { value: '<uk>', lang: 'uk' }`.
- An entry whose definition has no Ukrainian translation falls back to `lang: 'en'` source value.
- The lesson read uses **two queries total**: content tree + batched translation fetch. Verify with query logging.

**Depends on:** S2.3, S3.2, S4.1, S4.2.

---

### S4.4 — User saved-words endpoints (`/me/wordlist`) 🔲

**Story:** A logged-in user can have a personal "My Words" wordlist (`OwnerUserId = self`), save entries copied from any lesson wordlist into it, and add custom entries they typed in themselves.

**Why:** The architecture made `Wordlist.OwnerUserId` non-`NULL` exactly to support this without a parallel `UserSavedWord` table. Ship the endpoints early so the frontend can start building the "My Words" page in parallel.

**Engineering breakdown:**

- Inside `apps/api/src/modules/vocabulary/`:
  - `services/user-wordlist.service.ts`:
    - `getOrCreateDefaultWordlist(userId)` — returns the user's "My Words" wordlist, creating it if absent
    - `saveEntry(userId, sourceWordlistEntryId)` — copies the source entry (lemma + all attached lexical fields + examples + collocations) into the user's wordlist; also copies the source's translations into new `Translation` rows keyed to the new entry's id (so the user's saved copy is self-contained, immune to source edits)
    - `addCustomEntry(userId, { lemma, entryType, partOfSpeech, ... })` — creates a fresh entry in the user's wordlist
  - `http/controllers/me-wordlist.controller.ts`:
    - `GET  /me/wordlist` → `{ items: [user's wordlists] }`
    - `POST /me/wordlist/:WordlistId/save` → body: `{ sourceWordlistEntryId: string }`
    - `POST /me/wordlist/:WordlistId/entry` → body: `{ lemma, entryType, partOfSpeech?, v2?, v3?, transcription?, audioUrl?, note? }`
  - Reuse `/wordlist-entry/:EntryId` for editing and deleting saved entries (same model — no separate endpoint).
- Authorization: every `/me/*` endpoint enforces `OwnerUserId === currentUser.id` on the target wordlist; 403 otherwise. Admins do **not** see user-owned wordlists in `/wordlist` lists.

**Frontend context:**

- "Save this word" button on a lesson wordlist entry: `POST /me/wordlist/<defaultId>/save` with `{ sourceWordlistEntryId }`. UI shows a confirmation toast.
- "My Words" page: `GET /me/wordlist` → render each list, optionally with the same wordlist renderer used for lesson wordlists.
- Adding a custom word: a free-form form that POSTs to `/me/wordlist/<defaultId>/entry`.

**Acceptance:**

- A user with no saved words has zero `Wordlist` rows; the first `POST /me/wordlist/.../save` (with an explicit `WordlistId` from a `getOrCreateDefault` call, or via the implicit creation flow) creates the wordlist on demand.
- Saving the same source entry twice creates two separate entries (no dedup; matches the per-list ownership model).
- An admin cannot read or modify a user's wordlist via `/wordlist/:WordlistId` (403).
- A user cannot read or modify another user's wordlist.

**Depends on:** S4.3.

---

## Phase 5 — Grammar segment + Topic kind

### S5.1 — `GrammarTopic` + `GrammarBlock` tables 🔲

**Story:** A grammar topic exists as a content row with optional `title` and `tense`, plus an ordered list of typed blocks.

**Why:** Skeleton of the grammar kind. Payload tables (text/pattern) follow in S5.2.

**Engineering breakdown:**

- Migrations:
  - `create-grammar-topic.ts`:
    ```sql
    CREATE TABLE "GrammarTopic" (
      "id"         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "title"      VARCHAR(255),
      "tense"      VARCHAR(64),
      "createdAt"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      "updatedAt"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    ```
  - `create-grammar-block.ts`:
    ```sql
    CREATE TABLE "GrammarBlock" (
      "id"              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "GrammarTopicId"  UUID NOT NULL REFERENCES "GrammarTopic"(id) ON DELETE CASCADE,
      "blockType"       VARCHAR(16) NOT NULL CHECK ("blockType" IN ('text','pattern')),
      "order"           INT NOT NULL DEFAULT 0,
      "createdAt"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      "updatedAt"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    CREATE INDEX "idx_grammar_block_topic_order" ON "GrammarBlock" ("GrammarTopicId", "order");
    ```
- Entities: `grammar-topic.entity.ts`, `grammar-block.entity.ts`.

**Acceptance:**

- Migrations run and roll back cleanly.
- CHECK rejects `blockType = 'image'`.

**Depends on:** S3.2.

---

### S5.2 — `GrammarBlockText` + `GrammarBlockPattern` payload tables 🔲

**Story:** Each `GrammarBlock` row has exactly one payload row in either `GrammarBlockText` (for text blocks) or `GrammarBlockPattern` (for pattern blocks).

**Why:** Splitting payloads by structural type keeps each table cleanly typed and translatable without nullable-column sprawl.

**Engineering breakdown:**

- Migrations:
  - `create-grammar-block-text.ts`:
    ```sql
    CREATE TABLE "GrammarBlockText" (
      "GrammarBlockId" UUID PRIMARY KEY REFERENCES "GrammarBlock"(id) ON DELETE CASCADE,
      "textRole"       VARCHAR(32) NOT NULL CHECK ("textRole" IN ('description','example')),
      "text"           TEXT NOT NULL
    );
    ```
  - `create-grammar-block-pattern.ts`:
    ```sql
    CREATE TABLE "GrammarBlockPattern" (
      "GrammarBlockId" UUID PRIMARY KEY REFERENCES "GrammarBlock"(id) ON DELETE CASCADE,
      "form"           VARCHAR(64) NOT NULL,
      "markup"         TEXT NOT NULL,
      "parsedMarkup"   JSONB NOT NULL
    );
    ```
- Entities: `grammar-block-text.entity.ts`, `grammar-block-pattern.entity.ts`. Both use the `GrammarBlockId` as their primary key (1:1 with the block).

**Acceptance:**

- Migrations run and roll back cleanly.
- Deleting a `GrammarBlock` cascades to the payload row.
- Both CHECK constraints reject unknown values.

**Depends on:** S5.1.

---

### S5.3 — Pattern parser service 🔲

**Story:** When an admin saves a pattern markup like `I/We/They want [V1] (to him/her/them)`, the server parses it into the structured token array documented in §1.4 and stores it as `parsedMarkup`.

**Why:** Clients render from `parsedMarkup`, never from `markup`. The parser is the single source of truth for the token grammar.

**Engineering breakdown:**

- `apps/api/src/modules/grammar/services/pattern-parser.service.ts`:
  - `parse(markup: string): Token[]` — returns the JSON array shape from §1.4 (top-level array; tokens with `type` discriminator).
  - Handles all four token kinds: `static`, `options` (slash-separated), `slot` (`[…]`), `optional` (`(…)` with recursive parsing).
  - Throws a typed error on malformed markup; the orchestrator returns the error as a 4xx with line/column info.
- Unit tests in `apps/api/src/modules/grammar/services/pattern-parser.service.spec.ts` covering:
  - Each token kind individually
  - Nested optional containing options
  - Round-trip stability for the canonical example (`I/We/They want [V1] (to him/her/them)`)
  - Edge cases: empty options, unbalanced brackets, slot with non-alpha name

**Acceptance:**

- Tests pass.
- Parser output matches the JSON shapes documented in §1.4 byte-for-byte.

**Depends on:** S5.1 (so the consumer table exists), but the service itself is self-contained.

---

### S5.4 — Grammar Topic kind handler + block-orchestrator + endpoints 🔲

**Story:** Admins can attach a grammar topic to a lesson, add text/pattern blocks in any order, edit their payload, reorder, and delete. Pattern blocks get their markup parsed on every write. The lesson read endpoint returns the topic with all blocks in author order, localized.

**Why:** Finishes the grammar segment. After this, both vocabulary and grammar segments are end-to-end usable.

**Engineering breakdown:**

- Inside `apps/api/src/modules/grammar/`:
  - `templates/topic/grammar-topic.repository.ts` — joins topic + blocks + payload tables in one query.
  - `templates/topic/grammar-topic-kind-handler.ts` — implements `KindHandler`:
    - `createContent({ title, tense, blocks })` — inserts topic + blocks + payloads in a transaction. For each `pattern` block, runs the parser to populate `parsedMarkup`. For each `text` block, sanitizes `text` against the HTML allowlist.
    - `loadContent(id, resolver, langs)` — fetches and resolves translations for `('grammar_topic', id, 'title')` and `('grammar_topic', id, 'tense')`, then for each block `('grammar_block_text', id, 'text')` or `('grammar_block_pattern', id, 'markup')` (if any localized markup exists).
    - `serializeContent(loaded)` — produces the response shape from §6.3.
    - `deleteContent(id)` — FK cascade handles the rest.
  - `templates/topic/register.ts` — registers `'grammar.topic'` with the handler registry and pushes a catalog seed entry.
  - `services/block-orchestrator.service.ts`:
    - `addBlock(topicId, blockType, payload, order)` — inserts the block + dispatches to the right payload table based on `blockType`; for pattern blocks calls `PatternParserService.parse(markup)` before insert; for text blocks runs HTML sanitization (allowlist: `b, i, u, em, strong, code, br, p, ul, ol, li, a`)
    - `updateBlock(blockId, partial)` — same dispatch; re-parses on markup change
    - `deleteBlock(blockId)`
    - `reorderBlocks(topicId, orderedIds[])`
  - `services/html-sanitizer.service.ts` — thin wrapper around a tag-allowlist sanitizer (e.g. `sanitize-html`).
  - `http/controllers/grammar-topic.controller.ts`:
    - `GET   /grammar-topic/:TopicId` → topic + all blocks + payloads
    - `PATCH /grammar-topic/:TopicId` → update title/tense
    - `POST  /grammar-topic/:TopicId/block` → body: `{ blockType, order, payload }` where payload shape matches the block type
  - `http/controllers/grammar-block.controller.ts`:
    - `PATCH  /grammar-block/:BlockId/reorder` → body: `{ orderedIds: string[] }`
    - `PATCH  /grammar-block/:BlockId` → payload-specific update
    - `DELETE /grammar-block/:BlockId`
  - Wire `register.ts` into `GrammarModule`.

**Frontend context:**

- Authoring: a topic editor with two columns — topic-level fields (title, tense) on the left, block list on the right with a "+ Add block" button that opens a type picker. Each block renders an inline editor matching its type. Reordering via drag-and-drop posts `PATCH /grammar-block/:id/reorder`.
- Reading: lesson page receives the topic with `blocks` in order. The client renders text blocks as HTML (trust the sanitized value) and pattern blocks by walking the `parsedMarkup` token tree.

**Acceptance:**

- Author flow: `POST /lesson/.../segment` with `{ SegmentKindId: 'sk-gt', content: { title, tense } }`, then several `POST /grammar-topic/:id/block` calls produce the lesson tree shown in the architecture doc's Worked Example.
- Re-saving a pattern block with new markup re-parses and updates `parsedMarkup`.
- HTML sanitization strips `<script>` and other non-allowlisted tags on write.
- The lesson read still uses two queries (content + batched translations).
- `PATCH /grammar-block/:id/reorder` accepts the full ordered list of sibling block ids and rewrites `order` accordingly.

**Depends on:** S2.3, S3.2, S5.1, S5.2, S5.3.

---

## Phase 6 — Shared types

### S6.1 — Publish lesson/segment response types from `packages/shared` 🔲

**Story:** The frontend imports the lesson and segment response types from `@voqu/shared` instead of redefining them.

**Why:** Keeps the API contract single-sourced. Backend response constructors implement the same types the frontend hooks consume — any drift becomes a TypeScript error on either side.

**Engineering breakdown:**

- In `packages/shared/src/`:
  - `enums/lesson-status.ts` — re-export of the in-code enum used in the API
  - `enums/part-of-speech.ts` — same
  - `types/localized-value.ts` — `export interface LocalizedValue { value: string; lang: string; }`
  - `types/segment-kind-ref.ts` — `{ code: string; name: LocalizedValue }` (and same for `segment-type-ref.ts`)
  - `types/wordlist-response.ts` — the shape returned by the wordlist kind handler (entry array, examples, collocations)
  - `types/grammar-topic-response.ts`, `types/grammar-block-response.ts` — text and pattern variants of block payloads
  - `types/lesson-response.ts` — top-level lesson shape composing the above
- Update `apps/api`'s response constructors (Phases 1, 4, 5) to `implements` these interfaces.
- Update `apps/web`'s hooks (`useLessonsList`, `useLessonById`, etc.) to import from `@voqu/shared` instead of redeclaring inline types.
- Verify `packages/shared` has a working `tsconfig` that emits types both `apps/api` and `apps/web` can consume.

**Acceptance:**

- Backend builds with no type errors after the `implements` annotations.
- Frontend builds and uses the shared types in at least one hook.
- Changing a field in a shared type breaks both sides at compile time (verify by trial).

**Depends on:** S4.3, S5.4 (the response shapes need to be stable before they're exported).

---

## Cross-cutting / glue stories

### SX.1 — Update `app.module.ts` to wire all new modules 🔲

**Story:** All the new modules are registered in `AppModule` in the right order so the application boots.

**Engineering breakdown:**

- After each phase, add the new module to the `imports` array of `apps/api/src/app.module.ts` in dependency order:
  ```
  ConfigModule, TypeOrmModule,
  LevelModule, CourseModule,                    // existing
  LessonModule,                                 // S1.1
  LocalizationModule,                           // S2.x
  SegmentCatalogModule, LessonSegmentModule,    // S3.x
  VocabularyModule,                             // S4.x
  GrammarModule,                                // S5.x
  ```
- This isn't a single PR but a tag-along to each phase.

---

### SX.2 — Audit job: orphan content rows 🔲

**Story:** A scheduled job (or a CLI command) checks for content rows whose `LessonSegment` was deleted but whose payload tables weren't cleaned up (since `SegmentContentRowId` is FK-by-convention).

**Why:** Belt-and-suspenders for the polymorphic FK. The transactional delete in the kind handler should make this a no-op, but having an audit catches drift early.

**Engineering breakdown:**

- `apps/api/src/modules/lesson-segment/services/orphan-audit.service.ts`:
  - For each registered `SegmentKind`, query `SegmentKind.tableName` for rows whose `id` is not present as `SegmentContentRowId` in any `LessonSegment` AND (for `Wordlist`) whose `OwnerUserId IS NULL` — these are lesson-content rows with no parent segment.
  - Log a warning per orphan; do **not** auto-delete (orphans are most likely a bug, not garbage).
- Expose as a NestJS scheduled task (daily) and as a CLI command `npm run audit:orphans` in `apps/api`.

**Acceptance:**

- Manually deleting a row from `Wordlist` directly (bypassing the handler) is detected on the next audit run.
- The audit does not flag user-owned wordlists (`OwnerUserId IS NOT NULL`).

**Depends on:** S3.2 (registry needed), S4.1 / S5.1 (some content tables to audit).

---

## Story dependency graph

```
S1.1 ──┬─► S2.3
       └─► S3.1 ──► S3.2 ──┬─► S4.1 ──► S4.2 ──► S4.3 ──► S4.4 ──┐
                            │                                       ├─► S6.1
                            └─► S5.1 ──► S5.2 ──► S5.4 ────────────┤
                                                  ▲                 │
S2.1 ──► S2.2 ──► S2.3 ─────────────────────────► │                 │
                                                  │                 │
                              S5.3 ───────────────┘                 │
                                                                    │
                                                       SX.2 ───────►│  (any time after S3.2)
                                                       SX.1 ────────►  (alongside each phase)
```

Reading the graph: anything reachable from S1.1 + S2.1 in parallel is fair game on day one. Phases 4 and 5 fan out from S3.2 and can be done in parallel by two developers. S6.1 closes the loop once the response shapes stabilize.

---

## Total scope

- **17 stories** across 6 backend phases + 2 cross-cutting.
- Each story is sized for a single PR.
- Roughly: Phase 1 = 1 story, Phase 2 = 3, Phase 3 = 2, Phase 4 = 4, Phase 5 = 4, Phase 6 = 1, cross-cutting = 2.

If you want to add frontend stories later, they slot in after S4.3 (wordlist UI), S4.4 (My Words page), S5.4 (grammar topic UI), and S6.1 (typed hooks).
