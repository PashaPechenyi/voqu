import { useMutation } from './../../../shared/api/useMutation';
import { useState } from 'react';
import { getLessonDetailsReq } from '../helpers/getLessonDetailsReq.helper';
import { LessonDetails } from '../types/lessonDetails.type';

export const useLessonDetails = () => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetails | null>(null);

  const { mutate: getLessonDetails, isLoading } = useMutation({
    mutationFn: getLessonDetailsReq,
    onSuccess: (response) => {
      setLessonDetails(response.lesson);
      console.log(response.lesson);
    },
    onError(err) {
      console.log(err);
      console.log('Something went wrong...');
    },
  });

  return { isLoading, lessonDetails, setLessonDetails, getLessonDetails };
};
