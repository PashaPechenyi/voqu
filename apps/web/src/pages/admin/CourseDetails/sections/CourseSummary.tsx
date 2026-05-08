import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CourseSummaryCard from '@/features/courses/components/CourseSummaryCard';
import useToggle from '@/features/lessons/customHooks/useToggle';
import LessonAddModal from '@/features/lessons/components/LessonAddModal';
import { Lesson } from '@/features/lessons/types/lesson.types';
type CourseSummaryProps = {
  title: string;
  lessons?: Lesson[];
};

function CourseSummary({ title, lessons }: CourseSummaryProps) {
  const totalTime = lessons?.reduce((acc, lesson) => {
    return (acc += lesson.duration);
  }, 0);
  const lockedLessons = lessons?.filter((lesson) => {
    return lesson.islocked == true;
  });
  const totals = [
    { value: lessons?.length, text: 'Total Lessons' },
    { value: totalTime, text: 'Total Duration' },
    { value: lockedLessons?.length, text: 'Locked Lessons' },
  ];
  const {
    isOpen: isAddLessonModalOpen,
    open: openAddLessonModal,
    close: closeAddLessonModal,
  } = useToggle();

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
            openAddLessonModal();
          }}
        >
          <AddIcon sx={{ fill: 'white' }} />
          <Typography color="white" variant="body1">
            Add Lesson
          </Typography>
        </Button>
        <LessonAddModal close={closeAddLessonModal} isOpen={isAddLessonModalOpen} />
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
        {totals.map((el) => (
          <CourseSummaryCard key={el.value + el.text} value={el.value ?? 0} text={el.text} />
        ))}
      </Box>
    </Box>
  );
}

export default CourseSummary;
