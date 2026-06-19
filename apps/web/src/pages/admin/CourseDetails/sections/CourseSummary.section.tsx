import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CourseSummaryCard from '@/features/courses/components/CourseSummaryCard';
import LessonAddModal from '@/features/lessons/components/LessonAddModal';
import { LessonListItem } from '@/features/lessons/types/lesson.type';
import { useToggle } from '@/shared/hooks/useToggle';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useCreateLesson } from '@/features/lessons/hooks/useCreateLesson';
import { convertLessonFormToApiFormat } from '@/features/lessons/helpers/convertLessonFormToApiFormat.helper';
import { LessonFormValues } from '@/features/lessons/types/lessonForm.type';

type CourseSummarySectionProps = {
  title: string;
  lessons?: LessonListItem[];
  courseId: string;
  getLessons: () => void;
};

type CourseTotal = {
  value: number;
  label: string;
};

const buildTotals = (lessons: LessonListItem[]): CourseTotal[] => {
  // TODO: Total Duration and Locked Lessons are hardcoded to 0 — derive them from the lessons
  // once the LessonListItem model exposes duration / locked state.
  return [
    { value: lessons.length, label: 'Total Lessons' },
    { value: 0, label: 'Total Duration' },
    { value: 0, label: 'Locked Lessons' },
  ];
};

const CourseSummarySection: FC<CourseSummarySectionProps> = ({
  courseId,
  getLessons,
  title,
  lessons = [],
}) => {
  const {
    isOpen: isAddLessonModalOpen,
    open: openAddLessonModal,
    close: closeAddLessonModal,
  } = useToggle();

  const { createLesson } = useCreateLesson({
    onSuccess: () => {
      getLessons();
      closeAddLessonModal();
    },
  });

  const totals = buildTotals(lessons);

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.header}>
        <Box>
          <Typography variant="h2" sx={sxStyles.heading}>
            {title}
          </Typography>
          <Typography color="primary" variant="body1" sx={sxStyles.subtitle}>
            Manage lessons and course structure
          </Typography>
        </Box>
        <Button sx={sxStyles.addButton} onClick={openAddLessonModal}>
          <AddIcon sx={sxStyles.addIcon} />
          <Typography sx={sxStyles.addLabel} variant="body1">
            Add Lesson
          </Typography>
        </Button>
        <LessonAddModal
          onClose={closeAddLessonModal}
          onSubmit={(values: LessonFormValues) =>
            createLesson(courseId, convertLessonFormToApiFormat(values))
          }
          isOpen={isAddLessonModalOpen}
        />
      </Box>

      <Box sx={sxStyles.totalsRow}>
        {totals.map((total) => (
          <CourseSummaryCard key={total.label} value={total.value} label={total.label} />
        ))}
      </Box>
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
    typography: { xs: 'h4', sm: 'h2' },
  }),
  subtitle: { textAlign: 'start', mb: '20px' },
  addButton: (theme) => ({
    p: '15px 25px',
    backgroundColor: theme.palette.primary.main,
  }),
  addIcon: (theme) => ({ fill: theme.palette.common.white }),
  addLabel: (theme) => ({ color: theme.palette.common.white }),
  totalsRow: {
    display: 'flex',
    gap: '20px',
    width: 1,
    flexDirection: { xs: 'column', md: 'row' },
    mt: '20px',
  },
});

export default CourseSummarySection;
