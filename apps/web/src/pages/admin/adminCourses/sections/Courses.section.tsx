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
import { courses } from '@/features/courses/constants/initialCourses.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

import { ADMIN_COURSES_EDIT } from '@/shared/constants/urls.const';

export default function CoursesSection() {
  return (
    <Box sx={sxStyles.root}>
      {courses.map((courseData) => (
        <Card key={courseData.id} sx={sxStyles.card}>
          <CardMedia
            sx={{ height: 140, display: 'flex', justifyContent: 'end', p: 1 }}
            children={
              <Box>
                <Chip sx={{ mr: 1 }} color="success" label={courseData.status} />
                <Chip color="info" label={courseData.level} />
              </Box>
            }
            image={courseData.image}
            title={courseData.title}
          />
          <CardContent sx={sxStyles.content}>
            <Typography gutterBottom variant="h4" component="div">
              {courseData.title}
            </Typography>

            <Typography variant="h6" color={'primary'}>
              {courseData.description}
            </Typography>
            <Box sx={{ flex: 1 }}></Box>
            <Typography variant="body2" color={'primary'}>
              {courseData.lessons} lessons • {courseData.students} students
            </Typography>
          </CardContent>

          <Divider variant="middle" />
          <CardActions sx={sxStyles.actions}>
            <Button href={ADMIN_COURSES_EDIT} variant="contained" fullWidth>
              Edit Course
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'start',
  },
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
