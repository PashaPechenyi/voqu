import { httpClient } from '../../../shared/api/httpClient';
import { LessonListItem } from '../types/lessonListItem.type';
import { WordlistSegment } from '../types/wordlistSegment.type';

export type ReorderSegmentDTO = {
  lesson: LessonListItem;
  success?: true;
};
export type ReorderSegmentReqBody = {
  items: {
    SegmentId: WordlistSegment['id'];
    order: WordlistSegment['order'];
  }[];
};

export const reorderSegmentReq = async (
  lessonId: LessonListItem['id'],
  body: ReorderSegmentReqBody,
) => {
  return httpClient.patch<ReorderSegmentDTO>(`/lesson/segment/${lessonId}/reorder`, body);
};
