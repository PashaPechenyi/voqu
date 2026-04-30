import React, { useState } from 'react';
import LessonsSummary from './sections/LessonsSummary';
import { useParams } from 'react-router-dom';
import { courses } from '../Courses/sections/CoursesSection';
import LessonsList from './sections/LessonsList';
import { Box, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import DeleteLessonModule from '@/features/lessons/components/DeleteModal';
import ChageCourseModal from '@/features/courses/components/CourseModal';
import ChangeCourseModal from '@/features/courses/components/CourseModal';
import CourseModal from '@/features/courses/components/CourseModal';
import DeleteModal from '@/features/lessons/components/DeleteModal';

function EditLessons() {
  const { courseId } = useParams();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);
  const activeCourse = courses.find((course) => {
    return course.id === Number(courseId);
  });

  return (
    <>
      {activeCourse ? (
        <>
          <LessonsSummary title={activeCourse?.title} lessons={activeCourse.lessons} />{' '}
          <LessonsList lessons={activeCourse.lessons} />{' '}
          <Box sx={{ position: 'relative', pt: '60px', width: 1 }}>
            {' '}
            <Box
              sx={{ width: 1, display: 'flex', justifyContent: 'center', gap: '20px', p: '50px' }}
            >
              <Button
                sx={{ p: '10px', border: '2px solid grey' }}
                onClick={() => setIsOpenChangeModal(true)}
              >
                Edit Course
              </Button>
              <Button
                sx={{ backgroundColor: 'red', color: 'white', p: '10px' }}
                onClick={() => setIsOpenDeleteModal(true)}
              >
                Delete Course
              </Button>
            </Box>
            <DeleteModal
              isOpen={isOpenDeleteModal}
              setIsOpen={setIsOpenDeleteModal}
              title={activeCourse.title}
              mainWord="Course"
            />
          </Box>
          <CourseModal
            isOpen={isOpenChangeModal}
            setIsOpen={setIsOpenChangeModal}
            mainWord="Edit"
            course={activeCourse}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditLessons;
