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
