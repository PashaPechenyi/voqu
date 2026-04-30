import CourseCard from '@/features/courses/components/CourseCard';
import { Box } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import React from 'react';
type Lesson = {
  title: string;
  duration: number;
  type: string;
  islocked: boolean;
  icon: any;
};
export type Course = {
  id: number;
  title: string;
  description: string;
  lessonAmount: number;
  stdentAmount: number;
  status: string;
  level: string;
  img: string;
  link:string
  lessons: Lesson[]
};

export const courses: Course[] = [
  {
    id: 1,
    title: 'Listening Comprehension',
    description: 'Improve your listening skills with audio stories, podcasts, and native speaker',
    lessonAmount: 20,
    stdentAmount: 198,
    status: 'published',
    level: 'B1',
    img: 'English Grammar Essentials.jpg',
    link:"",
    lessons: [
      {
        title: 'Introductionto Tenses',
        duration: 12,
        type: 'reading',
        islocked: false,
        icon: DescriptionIcon,
      },
      {
        title: 'Presen Simple & Present Continuous',
        duration: 15,
        type: 'grammar',
        islocked: false,
        icon: ImportContactsIcon,
      },
      {
        title: 'Past Simple - Regular Verbes',
        duration: 14,
        type: 'grammar',
        islocked: false,
        icon: ImportContactsIcon,
      },
    ],
  },
  {
    id: 2,
    title: 'Business English Professional',
    description: 'Professional English for workplace communication, emails, and business',
    lessonAmount: 0,
    stdentAmount: 0,
    status: 'draft',
    level: 'C1',
    link:"",
    img: 'Advanced vocabulary builder.jpg',
    lessons: [
      {
        title: 'Introductionto Tenses',
        duration: 10,
        type: 'reading',
        islocked: false,
        icon: DescriptionIcon,
      },
      {
        title: 'Presen Simple & Present Continuous',
        duration: 25,
        type: 'grammar',
        islocked: false,
        icon: DescriptionIcon,
      },
      {
        title: 'Past Simple - Regular Verbes',
        duration: 24,
        type: 'grammar',
        islocked: false,
        icon: DescriptionIcon,
      },
    ],
  },
];
type CoursesSectionProps = {
  enteredValue: string;
  setEnteredValue: any;
};
function CoursesSection({ enteredValue, setEnteredValue }: CoursesSectionProps) {
  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap',
        mt: '40px',
      }}
    >
      {enteredValue != ''
        ? courses.map((el) => {
            if (el.title.toLowerCase().startsWith(enteredValue.toLowerCase())) {
              return (
                <CourseCard
                  id={el.id}
                  title={el.title}
                  description={el.description}
                  lessonAmount={el.lessonAmount}
                  studentAmount={el.stdentAmount}
                  status={el.status}
                  level={el.level}
                  img={el.img}
                />
              );
            }
          })
        : courses.map((el) => {
            return (
              <CourseCard
                id={el.id}
                title={el.title}
                description={el.description}
                lessonAmount={el.lessonAmount}
                studentAmount={el.stdentAmount}
                status={el.status}
                level={el.level}
                img={el.img}
              />
            );
          })}
    </Box>
  );
}

export default CoursesSection;
