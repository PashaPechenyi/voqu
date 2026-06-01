import { Course } from '@/features/courses/types/course.type';
import { LessonFormValues } from '../types/lessonFormValues.type';
import { LessonReqBody } from '../types/lessonReqBody.type';

export const lessonFormToReqBody = (
  form: LessonFormValues,
  courseId: Course['id'],
): LessonReqBody => {
  if (!form.segmentType) throw new Error('Lesson form is missing a segmentType');

  return {
    title: form.title,
    subtitle: form.subtitle,
    description: form.description,
    CourseId: courseId,
  };
};
