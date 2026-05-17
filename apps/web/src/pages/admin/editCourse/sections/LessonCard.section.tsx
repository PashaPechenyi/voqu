// TODO: A `LessonCard` is tied to the lesson entity and would be reused on any course-detail view — move to `features/lesson/components/LessonCard/`, not `pages/.../sections/`.
// TODO: Local variable names `LessType`, `LessonIcon`, `IconColor` use PascalCase for non-component values — only React components should be PascalCase. Rename to `lessonType`, `LessonIcon` (this one IS a component, OK), and `iconColor`.
// TODO: `backgroundColor: IconColor + 20` — string-concatenating a hex color with the literal `20` (`'#71677C20'`) coincidentally produces a 25% alpha. Use `alpha(IconColor, 0.13)` from `@mui/material/styles` for clarity.
// TODO: `Chip label={data.id}` shows a database id (`'1'`) to the user as if it were a sequence number — use `data.order` instead.
// TODO: Button intents are not wired: lock/edit/delete `IconButton`s have no `onClick`. Either implement or remove.
// TODO: Imports `createSxStylesList` from `@/theme/helpers` — use the canonical shared path.
// TODO: `sxStyles.lessonInfo as any` — drop `as any`.
// TODO: `Button` is imported but unused — remove.
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Lesson, lessonTypeColors, lessonTypeIcons } from '@/features/lesson/consts/lessons';
import { createSxStylesList } from '@/theme/helpers';

type LessonCardSectionProps = {
  data: Lesson;
};

export const LessonCardSection = ({ data }: LessonCardSectionProps) => {
  const LessType = data.type;
  const LessonIcon = lessonTypeIcons[LessType];
  const IconColor = lessonTypeColors[LessType];
  return (
    <Card sx={sxStyles.card} key={data.id}>
      <CardContent sx={sxStyles.cardContent}>
        <Chip label={data.id} color="primary" />
        <Box
          sx={{
            ...sxStyles.iconBackground,
            borderColor: IconColor,
            backgroundColor: IconColor + 20,
          }}
        >
          <LessonIcon fontSize="small" htmlColor={IconColor} />
        </Box>

        <Box>
          <Typography>{data.title}</Typography>
          <Box sx={sxStyles.lessonInfo as any}>
            <Typography variant="body2">{data.duration} min</Typography>
            <Chip label={data.type} color="primary" variant="outlined" size="small" />
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ flex: 1 }}></Box>
      <CardActions>
        <IconButton aria-label="lock">
          <LockOutlinedIcon />
        </IconButton>
        <IconButton color="warning" aria-label="edit">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
const sxStyles = createSxStylesList({
  card: {
    display: 'flex',
    borderRadius: 0,
    flexDirection: 'row',
  },
  cardContent: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  lessonInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  iconBackground: {
    border: '1px solid',
    borderRadius: '50px',
    p: 1,
    display: 'flex',
    alignItems: 'center',
  },
});
