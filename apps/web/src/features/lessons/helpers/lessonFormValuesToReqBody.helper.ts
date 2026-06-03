import { CreateLessonReqBody } from '../types/createLessonReqBodo.type';
import { LessonFormValues } from '../types/lessonForm.type';

export const lessonFormValuesToReqBody = (
  values: LessonFormValues,
  courseId: string,
): CreateLessonReqBody => {
  return {
    title: values.title,
    description: values.description,
    subtitle: values.subtitle,
    CourseId: courseId,
  };
};
