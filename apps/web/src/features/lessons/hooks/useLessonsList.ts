import { useState } from 'react';
import { LessonListItem } from '../types/lesson.type';
import { Course } from '@/features/courses/types/course.type';
import { getLessonsReq } from '../helpers/getLessonsReq.helper';
import { useMutation } from '@/shared/api';

type UseLessonsListProps = {
  onSuccess?: (lessonsList: LessonListItem[]) => void;
  onError?: (error: Error) => void;
};

// TODO: onSuccess and onError are not used in the hook
export const useLessonsList = () => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);
  const {
    isLoading,
    error,
    mutate: getLessons,
  } = useMutation({
    mutationFn: (courseId: Course['id']) => getLessonsReq(courseId),
    onSuccess: (result) => {
      setLessonsList(result.items);
    },
  });
  return { getLessons, lessonsList, isLoading, error, setLessonsList };
};
