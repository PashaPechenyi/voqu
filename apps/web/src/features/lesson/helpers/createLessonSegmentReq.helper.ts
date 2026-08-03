import { LessonListItem } from '../types/lessonListItem.type';
import { httpClient } from './../../../shared/api/httpClient';
import { WordlistSegment } from '../types/wordlistSegment.type';
type CreateLessonSegmentDTO = {
  segment: WordlistSegment;
};
export type LessonSegmentReqBody = {
  SegmentKindKey: string;
  title?: string;
  description?: string;
  order?: number;
  content: {};
};
export const createLessonSegmentReq = (
  lessonId: LessonListItem['id'],
  body: LessonSegmentReqBody,
) => {
  return httpClient.post<CreateLessonSegmentDTO>(
    `/lesson/segment/${lessonId}`,
    JSON.stringify(body),
  );
};
