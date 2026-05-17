import { Box, Card, CardContent, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { INITIAL_LESSONS } from '@/features/lesson/constants/initialLessons.const';

function StatisticSection() {
  const lessons = INITIAL_LESSONS.grammar;
  const duration = lessons.reduce((acc, item) => acc + item.duration, 0);
  const totalLessons = lessons.length;
  const lockedLessons = lessons.reduce((acc, item) => (item.locked ? acc + 1 : acc), 0);

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
