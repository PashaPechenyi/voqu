// TODO: This `CourseLevel` (`{ value: string; label: string }`) is unrelated to the `Level` shape in `features/levels/types/level/level.type.ts` (`{ id, name, cefrLevel, ... }`). Two features for the same concept. Merge: `features/levels/` should be the single source for level definitions; this `courseLevel.type.ts` looks like an old dropdown option type — delete it.
// TODO: Folder name `courseLevel` is confusing — it is not levels of courses, it actually mixes lesson exercise types (`AddNewLessonModal`, `ExerciseTypeKey`) with the dropdown labels. Restructure: delete the `courseLevel/` folder; move what's truly about levels into `features/levels/`, and put the lesson modal into `features/lesson/components/`.
export type CourseLevel = {
  value: string;
  label: string;
};
