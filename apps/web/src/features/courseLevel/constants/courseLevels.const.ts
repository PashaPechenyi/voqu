// TODO: This constant is never imported anywhere. The level options used by `CourseForm` come from `useGetLevelsList()` (the API). Delete this file once confirmed unused.
// TODO: If kept, the data duplicates `cefrLevels.const.ts` (`A1 - Beginner`, ...). One source of truth only.
import { CourseLevel } from '../types/courseLevel.type';

export const courseLevels: CourseLevel[] = [
  { value: 'A1', label: 'A1 - Beginner' },
  { value: 'A2', label: 'A2 - Elementary' },
  { value: 'B1', label: 'B1 - Intermediate' },
  { value: 'B2', label: 'B2 - Upper Intermediate' },
  { value: 'C1', label: 'C1 - Advanced' },
  { value: 'C2', label: 'C2 - Proficiency' },
];
