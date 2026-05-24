import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import CourseEditModal from '@/features/courses/components/CourseEditModal';
import CourseSummarySection from './sections/CourseSummary.section';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import { useToggle } from '@/shared/hooks/useToggle';
import { useCoursesList } from '@/features/courses/hooks/useCoursesList';
import { useDeleteCourse } from '@/features/courses/hooks/useDeleteCourse';
import { useEditCourse } from '@/features/courses/hooks/useEditCourse';
import { CourseFormValues } from '@/features/courses/types/courseForm.type';
import { courseFormToReqBody } from '@/features/courses/helpers/courseFormToReqBody.helper';
import { ADMIN_COURSES_URL } from '@/shared/constants/urls.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import LessonListItem from '@/features/lessons/components/LessonListItem';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { LessonType } from '@/features/lessons/enums/lessonType.enum';
import LessonsSection from './sections/Lessons.section';
const LESSONS = [
  {
    id: '1',
    title: 'Past Simple',
    description: 'lorem ipsum dolor sit',
    duration: 12,
    type: LessonType.Grammar,
    isLocked: false,
    icon: LibraryBooksIcon,
  },
  {
    id: '2',
    title: 'Present Simple',
    description: 'lorem ipsum dolor sit',
    duration: 20,
    type: LessonType.Grammar,
    isLocked: false,
    icon: LibraryBooksIcon,
  },
  {
    id: '3',
    title: 'Present Perfect Simple',
    description: 'lorem ipsum dolor sit',
    duration: 30,
    type: LessonType.Grammar,
    isLocked: false,
    icon: LibraryBooksIcon,
  },
];

const CourseDetailsPage: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { coursesList, fetchCourses, isLoading, error } = useCoursesList();
  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal } = useToggle();
  const { isOpen: isEditModalOpen, open: openEditModal, close: closeEditModal } = useToggle();

  const { deleteCourse } = useDeleteCourse({
    onSuccess: () => navigate(ADMIN_COURSES_URL),
  });
  const { editCourse } = useEditCourse({
    onSuccess: () => {
      fetchCourses();
      closeEditModal();
    },
  });

  // TODO: fetch once on mount; fetchCourses' identity depends on onSuccess/onError,
  // so listing it as a dep would refire the request whenever those callbacks change.
  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCourse = coursesList.find((course) => course.id === courseId);

  const handleDelete = () => {
    if (!courseId) return;
    deleteCourse(courseId);
  };

  const handleEdit = (values: CourseFormValues) => {
    if (!courseId) return;
    editCourse(courseId, courseFormToReqBody(values));
  };

  if (isLoading) return <Box>Loading…</Box>;
  if (error) return <Box>Failed to load course.</Box>;
  if (!activeCourse) return <Box>Course not found.</Box>;

  return (
    <>
      <CourseSummarySection title={activeCourse.name} />
      <LessonsSection lessons={LESSONS} />
      <Box sx={sxStyles.actionsWrapper}>
        <Box sx={sxStyles.actionsRow}>
          <Button sx={sxStyles.editButton} onClick={openEditModal}>
            Edit Course
          </Button>
          <Button sx={sxStyles.deleteButton} onClick={openDeleteModal}>
            Delete Course
          </Button>
        </Box>

        <ConfirmModal
          title="Delete Course"
          subtitle={`Are you sure you want to delete "${activeCourse.name}"? This action cannot be undone.`}
          isOpen={isDeleteModalOpen}
          buttonText="Delete Course"
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
        />
      </Box>
      <CourseEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        course={activeCourse}
        onEdit={handleEdit}
      />
    </>
  );
};

const sxStyles = createSxStylesList({
  actionsWrapper: { position: 'relative', pt: '60px', width: 1 },
  actionsRow: {
    width: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    p: '50px',
  },
  editButton: (theme) => ({
    p: '10px',
    border: `2px solid ${theme.palette.divider}`,
  }),
  deleteButton: (theme) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    p: '10px',
  }),
});

export default CourseDetailsPage;
