import { FC, Fragment, useEffect } from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import LessonListItem from '@/features/lessons/components/LessonListItem';
import { LessonListItem as TLessonListItem } from '@/features/lessons/types/lesson.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

type LessonsSectionProps = {
  lessons: TLessonListItem[];
};

const LessonsSection: FC<LessonsSectionProps> = ({ lessons }) => {
  const [items, setItems] = useState(lessons);
  useEffect(() => {
    setItems(lessons);
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
            setItems((items) => move(items, event));
          }}
        >
          <ul>
            {items.map((lesson, index) => (
              <Fragment key={lesson.id}>
                <LessonListItem id={lesson.id} lesson={lesson} index={index} />
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
