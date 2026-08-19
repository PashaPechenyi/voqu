import { FC, Fragment } from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import LessonItem from '@/features/lessons/components/LessonItem';
import { LessonListItem } from '@/features/lessons/types/lesson.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { useMutation } from '@/shared/api';
import { reorderLessonsReq } from '@/features/lessons/helpers/reorderLessonsReq.helper';
import { convertReorderLessonToApiFormat } from '@/features/lessons/helpers/convertReorderLessonToApiFormat.helper';

// TODO: `setLessons` drills a raw setState setter through props and the section mirrors the `lessons` prop into local state — the lessons list should have a single owner (this section owns it, or the hook exposes an intent-named reorder method), not be duplicated across parent and child.
type LessonsSectionProps = {
  lessons: LessonListItem[];
  reloadLessons: () => void;
  setLessons: React.Dispatch<React.SetStateAction<LessonListItem[]>>;
  courseId: string;
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
            reorderLessons(convertReorderLessonToApiFormat(orderList), courseId);
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
