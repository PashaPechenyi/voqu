// TODO: This enum and the `lessonTypeIcons` / `lessonTypeColors` / `Lesson['type']` literal union (`features/lesson/consts/lessons.ts`) describe the same thing in two different forms. Pick one: keep this enum and re-type `Lesson['type']` as `ExerciseTypeKey`; or drop this enum and let the literal union win. Drift will cause mismatches.
// TODO: The "courseLevel" feature folder seems misnamed — "exercise type" belongs to lesson/exercise, not to course level. Move into `features/lesson/types/` or a new `features/exercise/` feature.
export enum ExerciseTypeKey {
  reading = 'reading',
  listening = 'listening',
  grammar = 'grammar',
  quiz = 'quiz',
}
