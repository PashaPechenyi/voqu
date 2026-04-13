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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { courses } from '@/features/courses/constants/initialCourses.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

export default function CoursesSection() {
  return (
    <Box sx={sxStyles.root}>
      {courses.map((courseData) => (
        <Card sx={sxStyles.card}>
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
            <Button variant="contained" size="medium">
              Edit Course
            </Button>
            <Button color="adminSecondary" variant="outlined" size="small">
              <RemoveRedEyeIcon />
            </Button>
            <Button color="adminSecondary" variant="outlined" size="small">
              <MoreVertIcon />
            </Button>
            <Button color="error" variant="outlined" size="small">
              <DeleteIcon />
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
    gap: 3,
    alignItems: 'center',
    flexDirection: 'row',
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
    maxWidth: '50%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});
