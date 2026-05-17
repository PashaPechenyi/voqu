import { createSxStylesList } from '@/theme/helpers';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { initialLessons } from '../../../../features/lesson/consts/lessons';

export const StatisticSection = () => {
  const duration = initialLessons.grammar.reduce((acc, item) => {
    return (acc += item.duration);
  }, 0);
  const totalLessons = initialLessons.grammar.length;
  const lockedLessons = initialLessons.grammar.reduce((acc, item) => {
    if (item.locked) acc += 1;
    return acc;
  }, 0);
  const STATISTICS_DATA = [
    { type: duration, label: 'Total Duration' },
    { type: totalLessons, label: 'Total Lessons' },
    { type: lockedLessons, label: 'Locked Lessons' },
  ];

  return (
    <Box sx={sxStyles.root as any}>
      {STATISTICS_DATA.map((item) => (
        <Card sx={sxStyles.card}>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {item.type}
            </Typography>
            <Typography color={'primary'} variant="body2">
              {item.label}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
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
