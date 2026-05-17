import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { ADMIN_COURSES_EDIT_URL } from '@/shared/constants/urls.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Course } from '@/features/courses/types/course.type';

type CourseCardProps = {
  course: Course;
};

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card sx={sxStyles.card}>
      <CardMedia sx={sxStyles.media} title={course.name}>
        <Box>
          <Chip sx={{ mr: 1 }} color="success" label={course.status} />
          <Chip color="info" label={course.LevelId} />
        </Box>
      </CardMedia>
      <CardContent sx={sxStyles.content}>
        <Typography gutterBottom variant="h4" component="div">
          {course.name}
        </Typography>
        <Box sx={{ flex: 1 }} />
      </CardContent>

      <Divider variant="middle" />
      <CardActions sx={sxStyles.actions}>
        <Button href={ADMIN_COURSES_EDIT_URL(course.id)} variant="contained" fullWidth>
          Edit Course
        </Button>
      </CardActions>
    </Card>
  );
}

const sxStyles = createSxStylesList({
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 500,
    maxWidth: 345,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  media: {
    height: 140,
    display: 'flex',
    justifyContent: 'end',
    p: 1,
  },
});

export default CourseCard;
