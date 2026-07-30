import { useMutation } from '@/shared/api';
import React, { useState } from 'react';
import { getLessonsDetailsReq } from '../helpers/getLessonsDetailsReq.helper';
import { LessonDetails } from '../types/lessonDetails.type';

export const useGetLessonDetails = () => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetails | null>(null);
  const {
    isLoading,
    error,
    mutate: getLessonDetails,
  } = useMutation({
    mutationFn: (lessonId: string) => getLessonsDetailsReq(lessonId),
    onSuccess: (result) => {
      console.log(result, 'result 1');
      setLessonDetails(result.lesson);
      console.log(result.lesson, '2');
    },
  });
  return { getLessonDetails, lessonDetails };
};
