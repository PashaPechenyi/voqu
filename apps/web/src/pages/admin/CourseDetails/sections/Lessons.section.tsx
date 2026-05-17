import { FC, Fragment } from 'react';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import LessonListItem from '@/features/lessons/components/LessonListItem';
import { Lesson } from '@/features/lessons/types/lesson.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LessonsSectionProps = {
  lessons: Lesson[];
};

const LessonsSection: FC<LessonsSectionProps> = ({ lessons }) => {
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
        {lessons.map((lesson, index) => (
          <Fragment key={lesson.id}>
            <LessonListItem lesson={lesson} index={index} />
            <Divider />
          </Fragment>
        ))}
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
