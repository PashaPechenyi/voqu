import { useMutation } from '@/shared/api';
import React, { useState } from 'react';
import { getLessonsDetailsReq } from '../helpers/getLessonsDetailsReq.helper';
import { LessonDetails } from '../types/lessonDetails.type';

export const useGetLessonDetails = () => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetails | null>(null);
  // TODO: rename isLoading to be feature specific like we did for mutate. AND add it to the hook return
  const {
    isLoading,
    error,
    mutate: getLessonDetails,
  } = useMutation({
    mutationFn: (lessonId: string) => getLessonsDetailsReq(lessonId),
    onSuccess: (result) => {
      setLessonDetails(result.lesson);
    },
  });
  return { getLessonDetails, lessonDetails };
};
