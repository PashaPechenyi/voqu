import { useCallback, useState } from 'react';
import { Course } from '@/features/courses/types/course.type';
import { LessonListItem } from '../types/lessonListItem.type';
import { getLessonsReq } from '../helpers/getLessonsReq.helper';

export const useLessonsList = () => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);

  // RENAME: fetchLessons -> getLessons -> getLessonsList - no 'fetch' in names; matches the lessonsList state it loads
  const getLessonsList = useCallback(async (courseId: Course['id']) => {
    const result = await getLessonsReq(courseId);
    setLessonsList(result.items);
  }, []);

  const addLessonToList = (lesson: LessonListItem) => {
    setLessonsList((prev) => [lesson, ...prev]);
  };

  return { lessonsList, setLessonsList, getLessonsList, addLessonToList };
};
