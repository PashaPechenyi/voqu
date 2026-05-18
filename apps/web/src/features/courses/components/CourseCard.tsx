import { FC } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Course } from '@/features/courses/types/course.type';
import { CourseStatus } from '../enums/courseStatus.enum';
import { ADMIN_COURSE_DETAILS_URL } from '@/shared/constants/urls.const';
import { useUpdateCourseStatus } from '../hooks/useUpdateCourseStatus';
import courseImage from '@/assets/images/EnglishGrammarEssentials.jpg';

type CourseCardProps = {
  course: Course;
  onStatusChanged?: () => void;
};

const CourseCard: FC<CourseCardProps> = ({ course, onStatusChanged }) => {
  const isPublished = course.status === CourseStatus.Published;
  const { updateCourseStatus } = useUpdateCourseStatus({
    onSuccess: () => onStatusChanged?.(),
  });

  const handleStatusToggle = () => updateCourseStatus(course);

  return (
    <Card sx={sxStyles.card}>
      <CardMedia sx={sxStyles.media} image={courseImage}>
        <Box sx={sxStyles.information}>
          <Button
            onClick={handleStatusToggle}
            sx={[sxStyles.courseStatus, isPublished ? sxStyles.published : sxStyles.draft]}
          >
            {course.status}
          </Button>
        </Box>
      </CardMedia>
      <CardContent sx={sxStyles.content}>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          {course.name}
        </Typography>
        <Box sx={sxStyles.metaRow}>
          <Typography variant="body2" color="primary">
            {2} lessons
          </Typography>
          <Box sx={sxStyles.metaDot} />
          <Typography variant="body2" color="primary">
            {349} students
          </Typography>
        </Box>
      </CardContent>

      <Divider sx={sxStyles.divider} />

      <CardActions sx={sxStyles.actions}>
        <Button
          fullWidth
          component={Link}
          sx={sxStyles.courseLink}
          to={ADMIN_COURSE_DETAILS_URL(course.id)}
          variant="contained"
          size="large"
        >
          <EditIcon fontSize="small" sx={sxStyles.editIcon} />
          Edit Lessons
        </Button>
      </CardActions>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  media: { height: 140, position: 'relative' },
  metaRow: { display: 'flex', gap: '20px', mt: '10px', alignItems: 'center' },
  metaDot: (theme) => ({
    width: '6px',
    height: '6px',
    borderRadius: '100%',
    backgroundColor: theme.palette.divider,
  }),
  divider: {
    mx: '16px',
  },
  actions: { justifyContent: 'center', gap: '8px' },
  editIcon: (theme) => ({ fill: theme.palette.common.white }),
  courseStatus: {
    p: '5px 10px',
    borderRadius: '30px',
    fontSize: '12px',
    lineHeight: '20px',
  },
  published: (theme) => ({
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  }),
  draft: (theme) => ({
    backgroundColor: theme.palette.grey[500],
  }),
  courseLink: {
    my: '8px',
  },
  information: {
    display: 'flex',
    gap: '15px',
    position: 'absolute',
    top: '10px',
    right: '4px',
  },
  card: (theme) => ({
    minHeight: 400,
    border: `2px solid ${theme.palette.divider}`,
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }),
  content: {
    flex: 1,
  },
});

export default CourseCard;
