import { httpClient } from '@/shared/api';

export const deleteLessonDetailsReq = (SegmentId: string) => {
  return httpClient.delete(`/lesson/segment/${SegmentId}`);
};
