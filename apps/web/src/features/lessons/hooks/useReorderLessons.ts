import { useCallback, useState } from 'react';
import { reorderLessonsReq, ReorderLessonsReqBody } from '../helpers/reorderLessonsReq.helper';
import { LessonListItem } from '../types/lesson.type';
import { Course } from '@/features/courses/types/course.type';
import { useMutation } from '@/shared/api';
type UseReorderLessonsProps = {
  onSuccess?: (data: any, body: ReorderLessonsReqBody, courseId: Course['id']) => void;
  onError?: (error: Error) => void;
};

export const useReorderLessons = ({ onSuccess }: UseReorderLessonsProps) => {
  const {
    isLoading,
    error,
    mutate: reorderLessons,
  } = useMutation({
    mutationFn: reorderLessonsReq,
    onSuccess: onSuccess,
  });
  return { reorderLessons, isLoading, error };
};
