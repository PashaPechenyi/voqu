import { CreateLessonReqBody } from '../types/createLessonReqBody.type';
import { LessonFormValues } from '../types/lessonForm.type';

// RENAME: lessonFormValuesToReqBody -> convertLessonFormToApiFormat - data-conversion helpers are named convert{Source}To{Target}Format
export const convertLessonFormToApiFormat = (values: LessonFormValues): CreateLessonReqBody => {
  return {
    title: values.title,
    description: values.description,
    subtitle: values.subtitle,
    status: values.status,
  };
};
