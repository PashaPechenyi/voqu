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

type CourseCardProps = {
  id:number,
  title: string;
  description: string;
  lessonAmount: number;
  studentAmount: number;
  status: string;
  level: string;
  img: string;
};

function CourseCard({
  id,
  title,
  description,
  lessonAmount,
  studentAmount,
  status,
  level,
  img,
}: CourseCardProps) {
  return (
    <Card sx={{ maxWidth: 345, border: '2px solid grey' }}>
      <CardMedia sx={{ height: 140, position: 'relative' }} image={'/src/assets/images/' + img}>
        <Box sx={{ display: 'flex', gap: '15px', position: 'absolute', top: '10px', right: '4px' }}>
          <Box
            sx={
              status == 'published'
                ? {
                    backgroundColor: 'lightgreen',
                    color: 'white',
                    p: '5px 10px',
                    borderRadius: '30px',
                    fontSize: '12px',
                    lineHeight: '20px',
                  }
                : {
                    backgroundColor: 'darkgrey',
                    p: '5px 10px',
                    borderRadius: '30px',
                    fontSize: '12px',
                    lineHeight: '20px',
                  }
            }
          >
            {status}
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
            {level}
          </Box>
        </Box>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="primary">
          {description}
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px', mt: '10px', alignItems: 'center' }}>
          <Typography variant="body2" color="primary">
            {lessonAmount} lessons
          </Typography>
          <Box
            sx={{ width: '6px', height: '6px', borderRadius: '100%', backgroundColor: 'grey' }}
          ></Box>
          <Typography variant="body2" color="primary">
            {studentAmount} students
          </Typography>
        </Box>
      </CardContent>
      <Divider sx={{ maxWidth: '90%', ml: '5%' }} />
      <CardActions sx={{ justifyContent: 'center', gap: '8px' }}>
        <Button
           component={Link}
          sx={{ p: '10px', backgroundColor: '#71677D', color: 'white', gap: '5px', width: "95%", my:"10px" }}
          to={`/admin/courses/${id}/courseEdit`}
        >
          <EditIcon fontSize="small" sx={{ fill: 'white' }} />
          Edit Lessons
        </Button>
      </CardActions>
    </Card>
  );
}

export default CourseCard;
