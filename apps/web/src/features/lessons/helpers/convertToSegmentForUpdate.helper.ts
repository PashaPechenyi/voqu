import { Segment } from '../types/lessonDetails.type';
import { UpdateLessonSegmentReqBody } from '../types/updateLessonSegmentReqBody.type';
import { convertWordToReqFormat } from './convertWordToReqFormat.helper';

export const convertToSegmentForUpdate = (segment: Segment): UpdateLessonSegmentReqBody => {
  return {
    order: 1,

    title: segment.title.value,
    description: segment.description.value,
    content: {
      description: {
        value: segment.wordlist.description.value,
        translation: segment.wordlist.description.translation,
      },
      entries: segment.wordlist.entries.map(convertWordToReqFormat),

      title: {
        value: segment.title.value,
        translation: segment.wordlist.title.translation,
      },
    },
  };
};
