import CourseSummary from './sections/CourseSummary';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import CourseEditModal from '@/features/courses/components/CourseEditModal';
import useFetchCourses from '@/features/courses/customHooks/useFetchCourses';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import useToggle from '@/features/lessons/customHooks/useToggle';
import { useEffect } from 'react';
import { CourseFormValues } from '@/features/courses/components/CourseAddModal';
function CourseDetails() {
  const { courseId } = useParams();
  const { coursesList, getCourses } = useFetchCourses();
  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal } = useToggle();
  const { isOpen: isEditModalOpen, open: openEditModal, close: closeEditModal } = useToggle();

  useEffect(() => {
    getCourses();
  }, []);
  const activeCourse = coursesList.find((course) => {
    return course.id === courseId;
  });

  async function deleteCourse() {
    await fetch(`/api/course/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const editCourse = async (inputsValues: CourseFormValues) => {
    const body = {
      name: inputsValues.name,
      //description: inputsValues.description,
      status: inputsValues.status?.toLowerCase(),
      LevelId: String(inputsValues.level?.id),
    };
    await fetch(`/api/course/${courseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    await getCourses();
    closeEditModal();
  };

  if (!activeCourse) return null;
  return (
    <>
      {/* <CourseSummary title={activeCourse.name} lessons={activeCourse.lessons} /> */}
      <CourseSummary title={activeCourse.name} />
      {/* <LessonsList lessons={activeCourse.lessons} /> */}
      <Box sx={{ position: 'relative', pt: '60px', width: 1 }}>
        <Box sx={{ width: 1, display: 'flex', justifyContent: 'center', gap: '20px', p: '50px' }}>
          <Button sx={{ p: '10px', border: '2px solid grey' }} onClick={() => openEditModal()}>
            Edit Course
          </Button>
          <Button
            sx={{ backgroundColor: 'red', color: 'white', p: '10px' }}
            onClick={() => openDeleteModal()}
          >
            Delete Course
          </Button>
        </Box>

        <ConfirmModal
          title="Delete Course"
          subtitle={`Are you sure you want to delete "${activeCourse.name}"? This action cannot be undone.`}
          isOpen={isDeleteModalOpen}
          buttonText="Delete Course"
          close={closeDeleteModal}
          deleteFunc={deleteCourse}
        />
      </Box>
      <CourseEditModal
        isOpen={isEditModalOpen}
        close={closeEditModal}
        course={activeCourse}
        editCourse={editCourse}
      />
    </>
  );
}

export default CourseDetails;
