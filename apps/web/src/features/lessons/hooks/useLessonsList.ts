import { useCallback, useState } from 'react';
import { LessonListItem } from '../types/lesson.type';
import { Course } from '@/features/courses/types/course.type';
import { getLessonsReq } from '../helpers/getLessonsReq.helper';
import { useMutation } from '@/shared/api';

type UseLessonsListProps = {
  onSuccess?: (lessonsList: LessonListItem[]) => void;
  onError?: (error: Error) => void;
};

export const useLessonsList = ({ onSuccess }: UseLessonsListProps = {}) => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);
  const {
    isLoading,
    error,
    mutate: getLessons,
  } = useMutation({
    mutationFn: (courseId: Course['id']) => getLessonsReq(courseId),
    onSuccess: (result) => {
      console.log(result, 'result vvvv');
      setLessonsList(result.items);
    },
  });
  return { getLessons, lessonsList, isLoading, error, setLessonsList };
};
