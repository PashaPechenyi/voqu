import { LessonListItem } from './../../../../../api/src/modules/lesson/structs/lesson-list-item.constructor';
import { getLessonsReq } from './../helpers/getLessonsReq.helper';
import { useCallback, useState } from 'react';

export const useLessonsList = () => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);

  const fetchLessons = useCallback(async () => {
    const result = await getLessonsReq();
    setLessonsList(result.items);
  }, []);

  //   const updateLessonInList = (lesson: Lesson) => {
  //     setLessonsList((prev) => prev.map((item) => (item.id === lesson.id ? lesson : item)));
  //   };

  const addLessonToList = (lesson: LessonListItem) => {
    setLessonsList((prev) => [lesson, ...prev]);
  };

  return { lessonsList, fetchLessons, addLessonToList };
};
