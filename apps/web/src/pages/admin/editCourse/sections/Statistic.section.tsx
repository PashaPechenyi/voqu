import { createSxStylesList } from '@/theme/helpers';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { initialLessons } from '../consts/lessons';

export const StatisticSection = () => {
  const duration = initialLessons.grammar.reduce((acc, item) => {
    return (acc += item.duration);
  }, 0);
  const totalLessons = initialLessons.grammar.length;
  const lockedLessons = initialLessons.grammar.reduce((acc, item) => {
    if (item.locked) acc += 1;
    return acc;
  }, 0);

  return (
    <Box sx={sxStyles.root as any}>
      <Card sx={sxStyles.card}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {totalLessons}
          </Typography>
          <Typography color={'primary'} variant="body2">
            Total Lessons
          </Typography>
        </CardContent>
      </Card>
      <Card sx={sxStyles.card}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {duration} min
          </Typography>
          <Typography color={'primary'} variant="body2">
            Total Duration
          </Typography>
        </CardContent>
      </Card>
      <Card sx={sxStyles.card}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {lockedLessons}
          </Typography>
          <Typography color={'primary'} variant="body2">
            Locked Lessons
          </Typography>
        </CardContent>
      </Card>
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
