import { FC, Fragment, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import LessonListItem from '@/features/lessons/components/LessonListItem';
import { LessonListItem as TLessonListItem } from '@/features/lessons/types/lesson.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { useReorderLessons } from '@/features/lessons/hooks/useReorderLessons';

type LessonsSectionProps = {
  lessons: TLessonListItem[];
  getLessons: () => void;
};

const LessonsSection: FC<LessonsSectionProps> = ({ lessons, getLessons }) => {
  // TODO: we don't need this state
  const [items, setItems] = useState(lessons);
  const { reorderLessons } = useReorderLessons({});

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
            const orderList = move(items, event);
            setItems(orderList);
            // TODO: items[0].CourseId throws when the list is empty; guard before reordering
            reorderLessons(orderList, items[0].CourseId);
          }}
        >
          <ul>
            {items.map((lesson, index) => (
              <Fragment key={lesson.id}>
                <LessonListItem
                  getLessons={getLessons}
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
