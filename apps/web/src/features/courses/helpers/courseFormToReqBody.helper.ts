import { CourseFormValues } from '../types/courseForm.type';
import { CreateCourseReqBody } from '../types/courseRequest.type';

export const courseFormToReqBody = (values: CourseFormValues): CreateCourseReqBody => {
  if (!values.level || !values.status) {
    throw new Error('Level and status are required');
  }
  return {
    name: values.name,
    status: values.status,
    LevelId: values.level.id,
    description: values.description,
  };
};
