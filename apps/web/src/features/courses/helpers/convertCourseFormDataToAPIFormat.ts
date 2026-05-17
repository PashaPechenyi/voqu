import { CourseFormValues } from '../types/courseFormValues.type';

export const convertCourseFormDataToAPIFormat = (data: CourseFormValues) => {
  return {
    name: data.title,
    description: data.description,
    status: data.status?.toLowerCase(),
    LevelId: String(data.level?.id),
  };
};
