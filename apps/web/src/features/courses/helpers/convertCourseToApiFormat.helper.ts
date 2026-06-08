import { Course } from '@/features/courses/types/course.type';
import { CourseReqBody } from '../types/courseReqBody.type';

// RENAME: fromCourseToReqBody (inline in CourseCard) -> convertCourseToApiFormat - data-conversion fns follow convert{X}To{Y}Format and live in their own file
export const convertCourseToApiFormat = (course: Course): CourseReqBody => {
  if (!course.Level) throw new Error('Course is missing a level');
  if (!course.status) throw new Error('Course is missing a status');
  return {
    name: course.name,
    status: course.status,
    // TODO: description is always sent as an empty string, wiping the existing course description on status change
    description: '',
    LevelId: course.Level.id,
  };
};
