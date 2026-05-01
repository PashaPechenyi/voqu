import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchControls from '@/features/search/components/SearchControls';

import CourseModal from '@/features/courses/components/CourseModal';
type IntroSectionProps = {
  setEnteredValue: any;
};
function IntroSections({ setEnteredValue }: IntroSectionProps) {
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
          onClick={() =>
            setIsOpenModal((prev) => {
              return !prev;
            })
          }
        >
          <AddIcon sx={{ fill: 'white' }} />
          <Typography color="white" variant="body1">
            {' '}
            Add New Course
          </Typography>
        </Button>
        <CourseModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} mainWord="Add" />
      </Box>
      <SearchControls setEnteredValue={setEnteredValue} />
    </Box>
  );
}

export default IntroSections;
