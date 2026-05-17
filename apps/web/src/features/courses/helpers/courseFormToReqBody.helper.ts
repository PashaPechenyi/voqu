import { CourseFormValues } from '../types/courseFormValues.type';
import { CourseReqBody } from '../types/courseReqBody.type';

export const courseFormToReqBody = (form: CourseFormValues): CourseReqBody => {
  if (!form.level) throw new Error('Course form is missing a level');
  if (!form.status) throw new Error('Course form is missing a status');
  return {
    name: form.title,
    description: form.description,
    status: form.status,
    LevelId: String(form.level.id),
  };
};
