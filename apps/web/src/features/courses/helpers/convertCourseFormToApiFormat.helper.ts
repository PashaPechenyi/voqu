import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseReqBody } from '../types/courseReqBody.type';

export const convertCourseFormToApiFormat = (form: CourseFormValues): CourseReqBody => {
  // TODO: throw new Error will crush the whole page if it is not wrapped in try-catch section
  if (!form.level) throw new Error('Course form is missing a level');
  if (!form.status) throw new Error('Course form is missing a status');
  return {
    name: form.title,
    description: form.description,
    status: form.status,
    LevelId: form.level.id,
  };
};
