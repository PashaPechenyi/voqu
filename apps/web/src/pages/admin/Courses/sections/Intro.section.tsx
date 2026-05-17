import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchControls from '@/features/search/components/SearchControls';
import CourseAddModal from '@/features/courses/components/CourseAddModal';
import { CourseFormValues } from '@/features/courses/types/courseForm.type';
import { useToggle } from '@/shared/hooks/useToggle';
import { useCreateCourse } from '@/features/courses/hooks/useCreateCourse';
import { courseFormToReqBody } from '@/features/courses/helpers/courseFormToReqBody.helper';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { CourseStatusFilterValue } from '@/features/search/constants/courseStatusFilterOptions.const';

type IntroSectionProps = {
  onSearchChange: (value: string) => void;
  statusFilter?: CourseStatusFilterValue;
  onStatusFilterChange?: (value: CourseStatusFilterValue) => void;
  onCourseCreated?: () => void;
};

const IntroSection: FC<IntroSectionProps> = ({
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCourseCreated,
}) => {
  const {
    isOpen: isAddCourseModalOpen,
    open: openAddCourseModal,
    close: closeAddCourseModal,
  } = useToggle();
  const { createCourse } = useCreateCourse({
    onSuccess: () => {
      closeAddCourseModal();
      onCourseCreated?.();
    },
  });

  const handleSubmit = (values: CourseFormValues) => createCourse(courseFormToReqBody(values));

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.header}>
        <Box>
          <Typography variant="h2" sx={sxStyles.heading}>
            Manage Courses
          </Typography>
          <Typography color="primary" variant="body1" sx={sxStyles.subtitle}>
            Create, edit, and organize your course library
          </Typography>
        </Box>
        <Button sx={sxStyles.addButton} onClick={openAddCourseModal}>
          <AddIcon sx={sxStyles.addIcon} />
          <Typography sx={sxStyles.addLabel} variant="body1">
            Add New Course
          </Typography>
        </Button>
        <CourseAddModal
          isOpen={isAddCourseModalOpen}
          onClose={closeAddCourseModal}
          onSubmit={handleSubmit}
        />
      </Box>
      <SearchControls
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
      />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: { position: 'relative' },
  header: {
    display: 'flex',
    alignItems: { xs: 'start', md: 'center' },
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', md: 'row' },
  },
  heading: (theme) => ({
    color: theme.palette.secondary.main,
    textAlign: 'start',
    mb: '20px',
    pt: '40px',
    typography: { xs: 'h3', sm: 'h2' },
  }),
  subtitle: { textAlign: 'start', mb: '20px' },
  addButton: (theme) => ({
    p: '15px 25px',
    backgroundColor: theme.palette.primary.main,
  }),
  addIcon: (theme) => ({ fill: theme.palette.common.white }),
  addLabel: (theme) => ({ color: theme.palette.common.white }),
});

export default IntroSection;
