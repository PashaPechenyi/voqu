// TODO: This `Course` type duplicates `features/courses/types/course.type.ts` with a different shape. Page-local types must not exist for entities — entities live in their feature folder. Move this type to `features/courses/types/course.type.ts` (merged with the other definition) and import from there everywhere.
// TODO: `LevelId: number` and `OwnerId: string` use PascalCase keys. Per the project convention, FK columns and relations in TypeORM entities use uppercase first letter (`LevelId`) — but on the frontend, the convention should match what the API actually sends. If the backend sends `LevelId` literally, fine; otherwise, change to camelCase.
// TODO: `status: string` should be `CourseStatusKey`.
export type Course = {
  id: string;
  name: string;
  status: string;
  LevelId: number;
  OwnerId: string;
  createdAt: string;
  updatedAt: string;
};
