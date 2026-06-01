import { Box, Card, CardContent, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
type StatisticSectionProps = {
  lessonsList: LessonListItem[];
};
function StatisticSection({ lessonsList }: StatisticSectionProps) {
  const duration = 0;
  //lessons.reduce((acc, item) => acc + item.duration, 0);
  const totalLessons = lessonsList.length;
  const lockedLessons = 0;
  //lessonsList.reduce((acc, item) => (item.locked ? acc + 1 : acc), 0);

  const statisticsList = [
    { id: 'duration', value: duration, label: 'Total Duration' },
    { id: 'lessons', value: totalLessons, label: 'Total Lessons' },
    { id: 'locked', value: lockedLessons, label: 'Locked Lessons' },
  ];

  return (
    <Box sx={sxStyles.root}>
      {statisticsList.map((stat) => (
        <Card key={stat.id} sx={sxStyles.card}>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {stat.value}
            </Typography>
            <Typography color="primary" variant="body2">
              {stat.label}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    mt: 5,
  },
  card: {
    p: 2,
    width: '40%',
    border: '2px solid',
    borderColor: 'adminSecondary.main',
    transition: 'ease-in-out 500ms',
    ':hover': {
      boxShadow: ' 5px 5px 10px 0px rgba(0, 0, 0, 0.25)',
    },
  },
});

export default StatisticSection;
