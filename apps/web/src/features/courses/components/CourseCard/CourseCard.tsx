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
import { ADMIN_COURSES_UPDATE_URL } from '@/shared/constants/urls.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Course } from '@/features/courses/types/course.type';
import { useUpdateCourse } from '../../hooks/useUpdateCourse';
import { CourseStatusKey } from '../../types/courseStatus.type';
import { convertCourseToApiFormat } from '../../helpers/convertCourseToApiFormat.helper';

type CourseCardProps = {
  course: Course;
  onUpdateSuccess: () => void;
};

function CourseCard({ course, onUpdateSuccess }: CourseCardProps) {
  // TODO: separation of concerns — CourseCard is presentational UI but owns the update mutation, the
  // request-body mapping, and the status-toggle logic. It should emit an event (e.g. onToggleStatus(course))
  // and let the parent section/page own useUpdateCourse and the request shaping.
  const { updateCourse, isLoading } = useUpdateCourse({ onSuccess: onUpdateSuccess });

  const onChangeStatus = (sourceCourse: Course) => {
    updateCourse(
      course.id,
      convertCourseToApiFormat({
        ...sourceCourse,
        status:
          sourceCourse.status === CourseStatusKey.Draft
            ? CourseStatusKey.Published
            : CourseStatusKey.Draft,
      }),
    );
  };

  return (
    <Card sx={sxStyles.card}>
      {/* FIXME: the media image is hardcoded to an external placeholder URL instead of the course image */}
      <CardMedia
        sx={sxStyles.media}
        title={course.name}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTi-Ev7Uu_sqkQXYE0heikrzY2UAlsdqdeLg&s"
      >
        <Box>
          <Button
            sx={{ mr: 1 }}
            onClick={() => onChangeStatus(course)}
            variant="contained"
            color={course.status === CourseStatusKey.Published ? 'success' : 'inherit'}
            loading={isLoading}
          >
            {course.status}
          </Button>
          {/* TODO: level chip label is hardcoded to 'lvl'; should show course Level */}
          <Chip color="info" label={'lvl'} />
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
        <Button href={ADMIN_COURSES_UPDATE_URL(course.id)} variant="contained" fullWidth>
          Update Course
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
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  media: {
    height: 200,
    display: 'flex',
    justifyContent: 'end',
    p: 1,
  },
});

export default CourseCard;
