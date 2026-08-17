import { httpClient } from './../../../shared/api/httpClient';
import { WordlistSegment } from '../types/wordlistSegment.type';
import { LocalizedValue } from '../types/lessonDetails.type';

export type UpdateLessonSegmentDTO = {
  segment: WordlistSegment;
};
export type UpdateLessonSegmentReqBody = {
  title?: LocalizedValue;
  description?: LocalizedValue;
  order?: number;
  content: {};
};
export const updateLessonSegmentReq = (
  segmentId: WordlistSegment['id'],
  body: UpdateLessonSegmentReqBody,
  lang: string,
) => {
  return httpClient.put<UpdateLessonSegmentDTO>(`/lesson/segment/${segmentId}?lang=${lang}`, body);
};
