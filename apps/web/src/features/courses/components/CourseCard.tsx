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
import { createSxStylesList } from '@/shared/helpers/theme.helpers';
import clsx from 'clsx';
import { Course } from '@/pages/admin/Courses/sections/CoursesSection';

const CLASSNAME = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const;

type CourseCardProps = {
  course: Course;
};

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card sx={sxStyles.card}>
      <CardMedia
        sx={{ height: 140, position: 'relative' }}
        image={'/src/assets/images/EnglishGrammarEssentials.jpg'}
      >
        <Box sx={sxStyles.information}>
          <Box
            sx={sxStyles.courseStatus}
            className={clsx({
              [CLASSNAME.PUBLISHED]: course.status == 'published',
              [CLASSNAME.DRAFT]: course.status == 'draft',
            })}
          >
            {course.status}
          </Box>
          {/* ERR */}
          {/* <Box sx={sxStyles.courseLevel}>{course.levelId.cefrLevel}</Box> */}
        </Box>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          {course.name}
        </Typography>
        {/* <Typography variant="body2" color="primary">
          {course.description}
        </Typography> */}
        <Box sx={{ display: 'flex', gap: '20px', mt: '10px', alignItems: 'center' }}>
          <Typography variant="body2" color="primary">
            {2} lessons
          </Typography>
          <Box
            sx={{ width: '6px', height: '6px', borderRadius: '100%', backgroundColor: 'grey' }}
          ></Box>
          <Typography variant="body2" color="primary">
            {349} students
          </Typography>
        </Box>
      </CardContent>
      <Divider sx={{ maxWidth: '90%', ml: '5%' }} />
      <CardActions sx={{ justifyContent: 'center', gap: '8px' }}>
        <Button
          component={Link}
          sx={sxStyles.courseLink}
          to={`/admin/courses/${course.id}/courseEdit`}
        >
          <EditIcon fontSize="small" sx={{ fill: 'white' }} />
          Edit Lessons
        </Button>
      </CardActions>
    </Card>
  );
}

const sxStyles = createSxStylesList({
  courseStatus: {
    p: '5px 10px',
    borderRadius: '30px',
    fontSize: '12px',
    lineHeight: '20px',

    [`&.${CLASSNAME.PUBLISHED}`]: {
      backgroundColor: 'lightgreen',
      color: 'white',
    },
    [`&.${CLASSNAME.DRAFT}`]: {
      backgroundColor: 'darkgrey',
    },
  },
  courseLevel: {
    p: '5px 10px',
    fontSize: '13px',
    border: '1px solid black',
    borderRadius: '30px',
    backgroundColor: 'white',
  },
  courseLink: {
    p: '10px',
    backgroundColor: '#71677D',
    color: 'white',
    gap: '5px',
    width: '95%',
    my: '10px',
    position: 'absolute',
    bottom: 20,
  },
  information: {
    display: 'flex',
    gap: '15px',
    position: 'absolute',
    top: '10px',
    right: '4px',
  },
  card: {
    width: '30%',
    minWidth: 315,
    height: 400,
    border: '2px solid grey',
    position: 'relative',
  },
});

export default CourseCard;
