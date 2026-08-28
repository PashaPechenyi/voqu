import { httpClient } from './../../../shared/api/httpClient';
import { WordlistSegment } from '../types/wordlistSegment.type';

export const deleteSegmentReq = (segmentId: WordlistSegment['id']) => {
  return httpClient.delete<void>(`/lesson/segment/${segmentId}`);
};
