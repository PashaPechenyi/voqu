import { useMutation } from '@/shared/api';
import React, { useState } from 'react';
import { getLessonsDetailsReq } from '../helpers/getLessonsDetailsReq.helper';
import { LessonDetails } from '../types/lessonDetails.type';

export const useGetLessonDetails = () => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetails | null>(null);
  const { isLoading: isLoadingLessonDetails, mutate: getLessonDetails } = useMutation({
    mutationFn: (lessonId: string) => getLessonsDetailsReq(lessonId),
    onSuccess: (result) => {
      setLessonDetails(result.lesson);
    },
  });
  return { getLessonDetails, lessonDetails, isLoadingLessonDetails };
};
