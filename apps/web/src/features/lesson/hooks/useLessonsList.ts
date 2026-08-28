import { useState } from 'react';

import { LessonListItem } from '../types/lessonListItem.type';
import { getLessonsReq } from '../helpers/getLessonsReq.helper';
import { useMutation } from '@/shared/api';

export const useLessonsList = () => {
  const [lessonsList, setLessonsList] = useState<LessonListItem[]>([]);

  const { mutate: getLessonsList } = useMutation({
    mutationFn: getLessonsReq,
    onSuccess: (response) => {
      setLessonsList(response.items);
    },
    //   onError(err) {
    //     console.log(err);
    //     console.log('Something went wrong...');
    // },
  });

  const addLessonToList = (lesson: LessonListItem) => {
    setLessonsList((prev) => [lesson, ...prev]);
  };

  return { lessonsList, setLessonsList, getLessonsList, addLessonToList };
};
