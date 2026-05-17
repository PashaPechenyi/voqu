// TODO: Imports `createSxStylesList` from `@/theme/helpers` — use the canonical `@/shared/helpers/styles/createSxStylesList.helper`.
// TODO: Uses `initialLessons.grammar` regardless of which course is open — hardcoded category. The section must receive `lessons: Lesson[]` from the parent.
// TODO: `STATISTICS_DATA` field is named `type` but holds the numeric value — rename to `value`. (`type` collides with the `Lesson['type']` concept used elsewhere.)
// TODO: `sxStyles.root as any` — `as any` is forbidden; fix the sx typing.
// TODO: `Box from '@mui/system'` while everywhere else in the project uses `Box from '@mui/material'`. Standardize.
// TODO: `<Card>` lacks a `key` prop in the `.map()` — React will warn.
// TODO: `(acc, item) => { return (acc += item.duration); }` — using `+=` to mutate the accumulator is misleading inside `reduce`; use `acc + item.duration`.
// TODO: `Box` from `@mui/system` is unnecessary here; replace with `@mui/material`'s `Box`.
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
