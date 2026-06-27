import { FC, Fragment, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import LessonItem from '@/features/lessons/components/LessonItem';
import { LessonListItem } from '@/features/lessons/types/lesson.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { useMutation } from '@/shared/api';
import {
  reorderLessonsReq,
  ReorderLessonsReqBody,
} from '@/features/lessons/helpers/reorderLessonsReq.helper';
import { Course } from '@/features/courses/types/course.type';
import { converReorderLessonToApiFormat } from '@/features/lessons/helpers/convertReorderLessomToApiFormat.helpers';

type LessonsSectionProps = {
  lessons: LessonListItem[];
  reloadLessons: () => void;
  setLessons: React.Dispatch<React.SetStateAction<LessonListItem[]>>;
  courseId: string;
};
type UseReorderLessonsProps = {
  onSuccess?: (data: any, body: ReorderLessonsReqBody, courseId: Course['id']) => void;
  onError?: (error: Error) => void;
};

const LessonsSection: FC<LessonsSectionProps> = ({
  lessons,
  reloadLessons,
  setLessons,
  courseId,
}) => {
  const { mutate: reorderLessons } = useMutation({
    mutationFn: reorderLessonsReq,
  });

  useEffect(() => {
    setLessons(lessons);
  }, [lessons]);

  return (
    <Card sx={sxStyles.card}>
      <CardMedia sx={sxStyles.header}>
        <Typography variant="h2" sx={sxStyles.title}>
          Course Lessons
        </Typography>
        <Typography variant="body1" color="tertiary">
          Drag to reorder lessons
        </Typography>
      </CardMedia>
      <CardContent>
        <DragDropProvider
          onDragEnd={(event) => {
            const orderList = move(lessons, event);
            setLessons(orderList);
            reorderLessons(converReorderLessonToApiFormat(orderList), courseId);
          }}
        >
          <ul>
            {lessons.map((lesson, index) => (
              <Fragment key={lesson.id}>
                <LessonItem
                  reloadLessons={reloadLessons}
                  id={lesson.id}
                  lesson={lesson}
                  index={index}
                />
                <Divider />
              </Fragment>
            ))}
          </ul>
        </DragDropProvider>
      </CardContent>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: { mt: '90px' },
  header: (theme) => ({
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    backgroundColor: theme.palette.secondary.main,
    p: '20px',
    alignItems: 'center',
  }),
  title: (theme) => ({ color: theme.palette.common.white }),
});

export default LessonsSection;
