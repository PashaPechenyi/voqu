import CourseCard from '@/features/courses/components/CourseCard';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Level } from '@/features/levels/types/level.type';
import { CourseStatusKey } from '@/features/courses/constants/courseStatus.const';
import useFetchCourses from '@/features/courses/customHooks/useFetchCourses';

type CoursesSectionProps = {
  enteredValue: string;
  setEnteredValue: any;
};
export type Course = {
  name: string;
  id: string;
  status: CourseStatusKey;
  levelId: Level;
  OwnerId?: string;
  createdAt?: string;
  updatedAt?: string;
};

function CoursesSection({ enteredValue }: CoursesSectionProps) {
  const { coursesList, getCourses } = useFetchCourses();
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mt: '40px',
      }}
    >
      {enteredValue != ''
        ? coursesList
            .filter((el) => el.name.toLowerCase().startsWith(enteredValue.toLowerCase()))
            .map((el) => <CourseCard key={el.id} course={el} />)
        : coursesList.map((el) => <CourseCard key={el.id} course={el} />)}
    </Box>
  );
}

export default CoursesSection;
