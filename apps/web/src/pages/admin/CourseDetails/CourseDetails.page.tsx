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
import LessonsSection from './sections/Lessons.section';
import { useLessonsList } from '@/features/lessons/hooks/useLessonsList';

const CourseDetailsPage: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { lessonsList, getLessons } = useLessonsList();
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

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (courseId) getLessons(courseId);
  }, [courseId]);

  // TODO: this page fetches the whole courses list and finds the active course client-side.
  // There is an endpoint to fetch a single course by id — use it instead of loading all courses.
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
      <CourseSummarySection
        title={activeCourse.name}
        getLessons={() => getLessons(courseId!)}
        courseId={courseId ?? ''}
      />
      <LessonsSection lessons={lessonsList} getLessons={() => getLessons(courseId!)} />
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
