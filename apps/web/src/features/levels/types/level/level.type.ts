// TODO: Folder structure is `features/levels/types/level/level.type.ts` — an extra `level/` subfolder per-type is unnecessary and inconsistent with `features/courses/types/course.type.ts` (no extra folder). Flatten to `features/levels/types/level.type.ts`.
// TODO: `cefrLevel: string` should be a union (`'A1' | 'A2' | ... | 'C2'`) or its own type imported from `cefrLevel.type.ts`.
// TODO: `createdAt`/`updatedAt` are typed as `string` — consistent with how the API delivers them, but document the format (ISO-8601).
export type Level = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  cefrLevel: string;
  order: number;
};
