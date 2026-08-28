import { httpClient } from '@/shared/api';

type ReorderLessonSegmentReqBody = {
  items: {
    SegmentId: string;
    order: number;
  }[];
};
export const reorderLessonSegment = (body: ReorderLessonSegmentReqBody, lessonId: string) => {
  return httpClient.patch(`/lesson/segment/${lessonId}/reorder`, body);
};
