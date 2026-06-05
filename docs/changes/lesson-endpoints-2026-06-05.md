# Lesson endpoints — change log (2026-06-05)

Added lesson management endpoints (delete, status update), a `duration` field, and
reworked lesson routes so the parent `CourseId` is a route param. Branch: `sonya`.

## Summary of what changed

1. **Delete lesson** endpoint.
2. **Update lesson status** (published/draft/archived) endpoint. Reused the existing
   `LessonStatus` enum (it already existed at `structs/lesson-status.enum.ts`).
3. **New optional `duration` column** on the `Lesson` table (minutes a lesson takes).
4. **Routing rework** — `CourseId` moved from query/body into the route, and lesson
   reorder now validates same-course membership and appends untouched lessons.

## API routes

Controller base path is now `@Controller('course/lesson')` — the base names the
course→lesson relationship; the id lives in the method route. This matches the AIDA V2
convention (e.g. `case/files` → `@Get(':CaseId/list')`).

| Method   | Route                              | Identified by | Purpose                     |
| -------- | ---------------------------------- | ------------- | --------------------------- |
| `GET`    | `/course/lesson/:CourseId/list`    | CourseId      | List lessons in a course    |
| `POST`   | `/course/lesson/:CourseId`         | CourseId      | Create a lesson in a course |
| `PATCH`  | `/course/lesson/:CourseId/reorder` | CourseId      | Reorder a course's lessons  |
| `PATCH`  | `/course/lesson/:LessonId/status`  | LessonId      | Update a lesson's status    |
| `DELETE` | `/course/lesson/:LessonId`         | LessonId      | Delete a lesson             |

- Course-scoped operations (list/create/reorder) carry `:CourseId`.
- Operations keyed by the lesson itself (status/delete) carry only `:LessonId`
  (CourseId is redundant when LessonId already identifies the row).

### Behavior changes

- `CourseId` removed from `ListLessonsQueryDto` (was a query param) and from
  `CreateLessonDto` (was in the body) — both now come from the route.
- **Reorder** (`LessonService.reorderLessons`):
  - validates the course exists,
  - validates **every** requested lesson belongs to that course (else `400 BadRequest`),
  - any lesson in the course **not** included in the request is appended **after** the
    explicitly ordered ones, preserving its current relative order ("order it as a next item").

## Database

- Migration `1776100631000-add-lesson-duration.ts` adds nullable `duration INT` to
  `Lesson`. (Timestamp is `...631000`, not `...630000`, to avoid colliding with the
  existing `seed-levels` migration, which shares the migration run pool with seeds.)
- Migration applied to the local DB.

## Files

### Added

- `apps/api/src/database/migrations/1776100631000-add-lesson-duration.ts`
- `apps/api/src/modules/lesson/http/dto/update-lesson-status.dto.ts`
- `apps/api/src/modules/lesson/http/dto/update-lesson-status-response.dto.ts`
- `apps/api/src/modules/lesson/structs/update-lesson-status-params.interface.ts`

### Modified

- `apps/api/src/database/entities/lesson.entity.ts` — added `duration?: number | null`.
- `apps/api/src/modules/lesson/http/controllers/lesson.controller.ts` — base path
  `course/lesson`; CourseId/LessonId params; new `updateStatus` and `delete` endpoints.
- `apps/api/src/modules/lesson/services/lesson.service.ts` — `updateLessonStatus`,
  `deleteLesson`, and the new reorder validation/append logic.
- `apps/api/src/modules/lesson/repositories/lesson.repository.ts` — `findIdsByCourse`
  helper; `duration` added to the list select.
- `apps/api/src/modules/lesson/http/dto/create-lesson.dto.ts` — dropped `CourseId`
  (now from route); added optional `duration`.
- `apps/api/src/modules/lesson/http/dto/list-lessons-query.dto.ts` — dropped `CourseId`.
- `apps/api/src/modules/lesson/http/dto/reorder-lessons.dto.ts` — body holds only
  `items`; `CourseId` comes from the route.
- `apps/api/src/modules/lesson/structs/create-lesson-params.interface.ts` — added
  `duration?`.
- `apps/api/src/modules/lesson/structs/list-lessons-params.interface.ts` — `CourseId`
  now required.
- `apps/api/src/modules/lesson/structs/reorder-lessons-params.interface.ts` — added
  `CourseId`.
- `apps/api/src/modules/lesson/structs/lesson-list-item.constructor.ts` — added
  `duration` to the response shape.

## Decisions

- **Controller stays in the `lesson` module** as a vertical slice (its own service,
  repository, entity, DTOs). The `course/lesson` route prefix is independent of the
  module folder. This differs from AIDA V2 (which has no separate child modules) but
  keeps lesson concerns in one place.

## Verification

- `npm run build` (apps/api) — passes.
- `npm run lint` — no new warnings/errors in changed files.
- Migration applied successfully against the local Postgres.

## Frontend (apps/web) — aligned to the backend changes

Scope: only the **existing** calls were updated to the new contract. The genuinely new
endpoints (reorder persistence, delete, update-status) were intentionally NOT wired up.

### Behavior

- **List**: `GET /api/lesson/?CourseId=…` → `GET /api/course/lesson/:CourseId/list`.
- **Create**: `POST /api/lesson` (CourseId in body) → `POST /api/course/lesson/:CourseId`
  (CourseId is now a route param). The request body no longer carries `CourseId`.
- **Duration**: the create form's `duration` value is now sent (parsed to an int; omitted
  if not a valid number) instead of being dropped. `LessonListItem` gains `duration`.

### Files modified

- `apps/web/src/features/lesson/helpers/getLessonsReq.helper.ts` — new list URL.
- `apps/web/src/features/lesson/helpers/createLessonReq.helper.ts` — takes `courseId` as a
  route param; body no longer includes `CourseId`.
- `apps/web/src/features/lesson/helpers/lessonFormToReqBody.helper.ts` — drops `CourseId`
  from the body; includes parsed `duration`; no longer needs the `courseId` arg.
- `apps/web/src/features/lesson/types/lessonReqBody.type.ts` — removed `CourseId`, added
  optional `duration`.
- `apps/web/src/features/lesson/types/lessonListItem.type.ts` — added `duration: number | null`.
- `apps/web/src/features/lesson/hooks/useCreateLesson.ts` — `createLesson(courseId, body)`.
- `apps/web/src/features/lesson/components/AddNewLessonModal.tsx` — updated submit call to
  the new `createLesson`/`lessonFormToReqBody` signatures.

### Not done (the "new endpoints")

- No `reorderLessonsReq` / reorder persistence (drag-and-drop remains local-only as before).
- No delete or update-status API helpers, hooks, or UI.

### Verification

- `tsc -b` — no errors in the changed files (pre-existing errors remain in
  `initialLessons.const.ts` and `CourseLessonsArea.section.tsx`, plus backend files pulled
  in by deep cross-package imports — all unrelated to these changes).
- `eslint` on the changed files — clean.
