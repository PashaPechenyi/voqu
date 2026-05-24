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
import { useLevelsList } from '@/features/levels/hooks/useLevelsList';
import { useEditCourse } from '../../hooks/useEditCourse';
import { useEffect } from 'react';
import { CourseStatusKey } from '../../types/courseStatus.type';

type CourseCardProps = {
  course: Course;
  onSuccess: () => void;
};

function CourseCard({ course, onSuccess }: CourseCardProps) {
  const { fetchLevels } = useLevelsList();
  const { editCourse, isLoading } = useEditCourse({ onSuccess });

  const fromCourseToReqData = (coursedata: Course) => {
    if (!coursedata.Level) throw new Error('Course coursedata is missing a level');
    if (!coursedata.status) throw new Error('Course coursedata is missing a status');
    return {
      name: coursedata.name,
      status: coursedata.status,
      description: '',
      LevelId: String(coursedata.Level.id),
    };
  };

  const onChangeStatus = (courseData: Course) => {
    editCourse(
      course.id,
      fromCourseToReqData({
        ...courseData,
        status:
          courseData.status === CourseStatusKey.Draft
            ? CourseStatusKey.Published
            : CourseStatusKey.Draft,
      }),
    );
  };

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);
  return (
    <Card sx={sxStyles.card}>
      <CardMedia sx={sxStyles.media} title={course.name}>
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
    //width: 345,
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
