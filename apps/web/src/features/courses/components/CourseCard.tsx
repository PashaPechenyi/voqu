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

const CLASSNAME = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const;

type CourseCardProps = {
  // TODO: do not use any
  course: any;
};

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card sx={{ minWidth: 345, border: '2px solid grey' }}>
      <CardMedia
        sx={{ height: 140, position: 'relative' }}
        image={'/src/assets/images/Advanced vocabulary builder.jpg'}
      >
        {/* TODO: move ALL sx styles below to sxStyles constant */}
        <Box sx={{ display: 'flex', gap: '15px', position: 'absolute', top: '10px', right: '4px' }}>
          <Box
            sx={sxStyles.courseStatus}
            className={clsx({
              [CLASSNAME.PUBLISHED]: course.status == 'published',
              [CLASSNAME.DRAFT]: course.status == 'draft',
            })}
          >
            {course.status}
          </Box>
          <Box
            sx={{
              p: '5px 10px',
              fontSize: '13px',
              border: '1px solid black',
              borderRadius: '30px',
              backgroundColor: 'white',
            }}
          >
            {course.LevelId}
          </Box>
        </Box>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          {course.name}
        </Typography>
        <Typography variant="body2" color="primary">
          {course.description}
        </Typography>
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
          sx={{
            p: '10px',
            backgroundColor: '#71677D',
            color: 'white',
            gap: '5px',
            width: '95%',
            my: '10px',
          }}
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
});

export default CourseCard;
