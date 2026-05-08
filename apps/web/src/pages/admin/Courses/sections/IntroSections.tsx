import { Box, Button, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SearchControls from '@/features/search/components/SearchControls';

import { CourseFormValues } from '@/features/courses/components/CourseAddModal';
import CourseAddModal from '@/features/courses/components/CourseAddModal';
import useToggle from '@/features/lessons/customHooks/useToggle';
type IntroSectionProps = {
  setEnteredValue: any;
};

function IntroSections({ setEnteredValue }: IntroSectionProps) {
  const {
    isOpen: isAddCourseModalOpen,
    open: openAddCourseModal,
    close: closeAddCourseModal,
  } = useToggle();

  const addNewCourse = (inputsValues: CourseFormValues) => {
    const body = {
      name: inputsValues.name,
      //description: inputsValues.description,
      status: inputsValues.status?.toLowerCase(),
      LevelId: String(inputsValues.levelId?.id),
    };
    fetch('/api/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    closeAddCourseModal();
  };
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
              typography: { xs: 'h3', sm: 'h2' },
            }}
          >
            Manage Courses
          </Typography>
          <Typography color="primary" variant="body1" sx={{ textAlign: 'start', mb: '20px' }}>
            Create, edit, and organize your course library
          </Typography>
        </Box>
        <Button
          sx={{ p: '15px 25px', backgroundColor: '#71677D' }}
          onClick={() => openAddCourseModal()}
        >
          <AddIcon sx={{ fill: 'white' }} />
          <Typography color="white" variant="body1">
            Add New Course
          </Typography>
        </Button>
        <CourseAddModal isOpen={isAddCourseModalOpen} close={close} onclick={addNewCourse} />
      </Box>
      <SearchControls setEnteredValue={setEnteredValue} />
    </Box>
  );
}

export default IntroSections;
