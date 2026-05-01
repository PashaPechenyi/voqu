import { Button, Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import LessonModal from '@/features/lessons/components/LessonModal';
type LessonsSummaryProps = {
  title: string;
  lessons?: any[];
};

// TODO: rename to CourseSummary
function LessonsSummary({ title, lessons }: LessonsSummaryProps) {
  const totalTime = lessons?.reduce((acc, lesson) => {
    return (acc += lesson.duration);
  }, 0);
  const lockedLessons = lessons?.filter((lesson) => {
    return lesson.islocked == true;
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'start', md: 'center' },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: '#37123c',
              textAlign: 'start',
              mb: '20px',
              //fontSize: { xs: '45px', md: '60px' },
              pt: '40px',
              typography: { xs: 'h4', sm: 'h2' },
            }}
          >
            {title}
          </Typography>
          <Typography color="primary" variant="body1" sx={{ textAlign: 'start', mb: '20px' }}>
            Manage lessons and course structure
          </Typography>
        </Box>
        <Button
          sx={{ p: '15px 25px', backgroundColor: '#71677D' }}
          onClick={() => {
            setIsOpenModal((prev) => !prev);
          }}
        >
          <AddIcon sx={{ fill: 'white' }} />
          <Typography color="white" variant="body1">
            Add Lesson
          </Typography>
        </Button>
        <LessonModal setIsOpen={setIsOpenModal} isOpen={isOpenModal} mainWord="Add" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          width: 1,
          flexDirection: { xs: 'column', md: 'row' },
          mt: '20px',
        }}
      >
        {/* TODO: move card to separate component */}
        <Card sx={{ p: '20px 50px', textAlign: 'center', border: '2px solid grey', width: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography color="secondary" variant="h5">
              {lessons?.length}
            </Typography>
            <Typography color="primary" variant="body1">
              Total Lessons
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: '20px 50px', textAlign: 'center', border: '2px solid grey', width: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography color="secondary" variant="h5">
              {totalTime} min
            </Typography>
            <Typography color="primary" variant="body1">
              Total Duration
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ p: '20px 50px', textAlign: 'center', border: '2px solid grey', width: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h5" color="secondary">
              {lockedLessons?.length}
            </Typography>
            <Typography color="primary" variant="body1">
              Locked Lessons
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default LessonsSummary;
