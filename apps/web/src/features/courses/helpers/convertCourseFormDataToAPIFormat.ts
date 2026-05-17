import { CourseFormValues } from '../types/courseFormValues.type';

export type CreateCoursePayload = {
  name: string;
  description: string;
  status?: string;
  LevelId?: string;
};

export const convertCourseFormDataToAPIFormat = (data: CourseFormValues): CreateCoursePayload => ({
  name: data.title,
  description: data.description,
  status: data.status ?? undefined,
  LevelId: data.level ? String(data.level.id) : undefined,
});
