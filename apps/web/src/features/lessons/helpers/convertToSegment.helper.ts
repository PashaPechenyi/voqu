import { Segment } from '../types/lessonDetails.type';
import { convertWordToReqFormat } from './convertWordToReqFormat.helper';

export function convertToSegment(lessonDetails: Segment): any {
  return {
    order: 1,
    SegmentKindKey: 'wordlist',
    title: lessonDetails.title.value,
    description: lessonDetails.description.value,
    content: {
      description: {
        value: lessonDetails.wordlist.description.value,
        translation: lessonDetails.wordlist.description.translation,
      },
      entries: lessonDetails.wordlist.entries.map(convertWordToReqFormat),

      title: {
        value: lessonDetails.title.value,
        translation: lessonDetails.wordlist.title.translation,
      },
    },
  };
}
