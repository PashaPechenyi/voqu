// TODO: Type name `PopularCourses` is plural but describes a single course. Rename to `PopularCourse` (singular). The file name `popularCourses.type.ts` is also plural; rename to `popularCourse.type.ts`.
// TODO: This shape duplicates `Course` minus a few fields — consider deriving via `Pick<Course, 'name'|...>` plus the analytics fields, so a rename in `Course` propagates.
export type PopularCourses = {
  name: string;
  students: number;
  completion: number;
};
