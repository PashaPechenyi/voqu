// TODO: There are TWO `Course` types: this one (`features/courses/types/course.type.ts`) and another one at `pages/admin/adminCourses/types/course.type.ts` with completely different shapes (`name`/`LevelId`/`OwnerId` vs `title`/`level`/`status`/`lessons`/...). This is the biggest architecture problem in the project — they MUST be merged into a single canonical entity type living here under `features/courses/types/`. The page imports the wrong one in several places (e.g. `EditCourseModal`, `useEditCourse`).
// TODO: `level: string`, `status: string` should be typed unions (use `CourseLevelKey` and `CourseStatusKey`).
// TODO: `createdAt: string` — keep ISO and document it; consider switching to `Date` only at the UI boundary.
// TODO: This `Course` shape is the "frontend mock" shape (matches `initialCourses.const.ts`), while the actual API response (per `EditCoursePage` and `useGetCourses`) uses the entity shape from `adminCourses/types/course.type.ts`. Decide which is the truth and delete the other.
export type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  status: string;
  lessons: number;
  students: number;
  image: string;
  createdAt: string;
};
