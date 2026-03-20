import { createSxStylesList } from '@/theme/helpers';
import { Box, Divider, Typography } from '@mui/material';
import SectionDivider from '../../../../components/SectionDivider';

export default function AboutUsIntroSection() {
  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h3">About us</Typography>
      <Typography variant="body1" color={'primary'}>
        Voqu is a comprehensive English learning platform designed for ambitious learners who want
        to master the language through a structured, interactive approach.
      </Typography>
      <Typography variant="body1" color={'primary'}>
        Whether you're a complete beginner starting your English journey or an advanced learner
        refining your skills, Voqu provides a clear path from A1 to C2 proficiency levels. Our
        platform combines the rigor of the Common European Framework of Reference (CEFR) with
        engaging, modern teaching methods that make learning both effective and enjoyable.
      </Typography>
      <Typography variant="body1" color={'primary'}>
        Perfect for professionals advancing their careers, students preparing for exams, or anyone
        seeking to communicate confidently in English—Voqu adapts to your goals, schedule, and
        learning style.
      </Typography>
    </Box>
  );
}
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    gap: 3,
  },
});
