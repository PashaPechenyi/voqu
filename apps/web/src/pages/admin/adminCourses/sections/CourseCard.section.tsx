import { ADMIN_COURSES_EDIT_URL } from '@/shared/constants/urls.const';
import { createSxStylesList } from '@/theme/helpers';
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
import { Course } from '../types/course.type';

type CourseCardSectionProps = {
  courseData: Course;
};

export const CourseCardSection = ({ courseData }: CourseCardSectionProps) => {
  console.log(ADMIN_COURSES_EDIT_URL(courseData.id));
  return (
    <Card key={courseData.id} sx={sxStyles.card}>
      <CardMedia
        sx={{ height: 140, display: 'flex', justifyContent: 'end', p: 1 }}
        children={
          <Box>
            <Chip sx={{ mr: 1 }} color="success" label={courseData.status} />
            <Chip color="info" label={courseData.LevelId} />
          </Box>
        }
        title={courseData.name}
      />
      <CardContent sx={sxStyles.content}>
        <Typography gutterBottom variant="h4" component="div">
          {courseData.name}
        </Typography>
        <Box sx={{ flex: 1 }}></Box>
      </CardContent>

      <Divider variant="middle" />
      <CardActions sx={sxStyles.actions}>
        <Button href={ADMIN_COURSES_EDIT_URL(courseData.id)} variant="contained" fullWidth>
          Edit Course
        </Button>
      </CardActions>
    </Card>
  );
};
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
});
