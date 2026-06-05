import { LessonFormValues } from '../types/lessonFormValues.type';
import { LessonReqBody } from '../types/lessonReqBody.type';

export const lessonFormToReqBody = (form: LessonFormValues): LessonReqBody => {
  // TODO: throw new Error will break the page in browser if there is no try catch section to handle this error
  if (!form.segmentType) throw new Error('Lesson form is missing a segmentType');

  return {
    title: form.title,
    subtitle: form.subtitle,
    description: form.description,
    duration: Number(form.duration) || undefined,
  };
};
