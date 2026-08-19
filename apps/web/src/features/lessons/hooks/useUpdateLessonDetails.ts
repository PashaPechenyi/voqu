import { useMutation } from '@/shared/api';
import { createElement } from '@emotion/react';
import { CreateLessonSegmentReqBody } from '../types/createLessonSegmentReqBody.type';
import { editLessonDetailsReq } from '../helpers/editLessonDetailsReq';
import { UpdateLessonSegmentReqBody } from '../types/updateLessonSegmentReqBody.type';

type useUpdateLessonDetailsProps = {
  onSuccess: () => void;
};
export const useUpdateLessonDetails = ({ onSuccess }: useUpdateLessonDetailsProps) => {
  const { isLoading, mutate: updateLessonDetails } = useMutation({
    mutationFn: (lessonId: string, body: UpdateLessonSegmentReqBody, lang: string) =>
      editLessonDetailsReq(lessonId, body, lang),
    onSuccess: () => onSuccess?.(),
  });
  return { isLoading, updateLessonDetails };
};
