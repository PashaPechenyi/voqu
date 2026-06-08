import { LessonFormValues } from '../types/lessonFormValues.type';
import { LessonReqBody } from '../types/lessonReqBody.type';

// RENAME: lessonFormToReqBody -> convertLessonFormToApiFormat - data-conversion fns follow convert{X}To{Y}Format
export const convertLessonFormToApiFormat = (form: LessonFormValues): LessonReqBody => {
  // TODO: throwing here will break the page in the browser if there is no try/catch to handle this error
  // ALSO the lesson does not have any segment types And will not have so you can simply remove it
  if (!form.segmentType) throw new Error('Lesson form is missing a segmentType');

  return {
    title: form.title,
    subtitle: form.subtitle,
    description: form.description,
    duration: Number(form.duration) || undefined,
  };
};
