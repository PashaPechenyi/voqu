import { httpClient } from '@/shared/api';
import { CreateLessonSegmentReqBody } from '../types/createLessonSegmentReqBody.type';
import { UpdateLessonSegmentReqBody } from '../types/updateLessonSegmentReqBody.type';

export const editLessonDetailsReq = (
  SegmentId: string,
  body: UpdateLessonSegmentReqBody,
  lang: string,
) => {
  return httpClient.put(`/lesson/segment/${SegmentId}?lang=${lang}`, body);
};
