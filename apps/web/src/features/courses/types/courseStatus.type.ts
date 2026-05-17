// TODO: This enum is re-declared inside `EditCourseModal.tsx` (a local copy) — duplicate definition. Import this one and delete the inline copy.
// TODO: Prefer `const enum` or a const-object pattern (`as const`) — TS string enums emit runtime code. With `as const`, `Object.values(...)` still works (it's the same approach used elsewhere in the codebase).
// TODO: Keys are pseudo-quoted `'Draft'` / `'Published'` — TS allows it but unquoted PascalCase is the normal style: `Draft = 'draft'`.
export enum CourseStatusKey {
  'Draft' = 'draft',
  'Published' = 'published',
}
