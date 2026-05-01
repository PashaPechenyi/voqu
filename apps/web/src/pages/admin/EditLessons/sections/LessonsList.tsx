import LessonForEdit from '@/features/lessons/components/LessonForEdit';
import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
// FIXME: review should it be card
type LessonsListProps = {
  lessons: any[];
};
function LessonsList({ lessons }: LessonsListProps) {
  return (
    <Card sx={{ mt: '90px' }}>
      <CardMedia
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          backgroundColor: '#37123c',
          p: '20px',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: { xs: '30px', sm: '44px' }, fontWeight: 'bold' }} color="white">
          Course Lessons
        </Typography>
        <Typography variant="body1" color="tertiary">
          Drag to reorder lessons
        </Typography>
      </CardMedia>
      <CardContent>
        {lessons.map((lesson, ind) => (
          <>
            <LessonForEdit
              title={lesson.title}
              duration={lesson.duration}
              type={lesson.type}
              icon={lesson.icon}
              ind={ind}
            />
            <Divider />
          </>
        ))}
      </CardContent>
    </Card>
  );
}

export default LessonsList;
