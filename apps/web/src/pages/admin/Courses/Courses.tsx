import { useState } from 'react';
import IntroSections from './sections/IntroSections';
import CoursesSection from './sections/CoursesSection';

function Courses() {
  const [enteredValue, setEnteredValue] = useState<string>('');
  return (
    <>
      <IntroSections setEnteredValue={setEnteredValue} />
      <CoursesSection enteredValue={enteredValue} setEnteredValue={setEnteredValue} />
    </>
  );
}

export default Courses;
