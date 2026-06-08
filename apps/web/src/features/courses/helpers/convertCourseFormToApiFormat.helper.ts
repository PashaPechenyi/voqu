import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseReqBody } from '../types/courseReqBody.type';

// RENAME: courseFormToReqBody -> convertCourseFormToApiFormat - data-conversion fns follow convert{X}To{Y}Format
export const convertCourseFormToApiFormat = (form: CourseFormValues): CourseReqBody => {
  if (!form.level) throw new Error('Course form is missing a level');
  if (!form.status) throw new Error('Course form is missing a status');
  return {
    name: form.title,
    description: form.description,
    status: form.status,
    LevelId: form.level.id,
  };
};
