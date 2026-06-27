import { useCallback, useState } from 'react';
import { CreateLessonReqBody } from '../types/createLessonReqBody.type';
import { createLessonReq } from '../helpers/createLessonReq.helper';
import { useMutation } from '@/shared/api';
import { useLessonsList } from './useLessonsList';
import { Course } from '@/features/courses/types/course.type';

type UseCreateLessonProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
const { getLessons } = useLessonsList({});

export const useCreateLesson = ({}: UseCreateLessonProps) => {
  const {
    isLoading,
    error,
    mutate: createLesson,
  } = useMutation({
    mutationFn: (courseId: Course['id'], body: CreateLessonReqBody) =>
      createLessonReq(courseId, body),
    // onSuccess: () => {
    //   (courseId: Course['id']) => getLessons(courseId);

    // },
  });

  return { createLesson, isLoading, error };
};
