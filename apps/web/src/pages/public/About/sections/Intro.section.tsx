import { Box, Typography } from '@mui/material';

function IntroSection() {
  return (
    <>
      <Box sx={styles.main}>
        <Typography variant="h3">About Voqu</Typography>
        <Typography variant="body1" color="primary">
          Voqu is a comprehensive English learning platform designed for ambitious learners who want
          to master the language through a structured, interactive approach.
        </Typography>
        <Typography variant="body1" color="primary">
          Whether you're a complete beginner starting your English journey or an advanced learner
          refining your skills, Voqu provides a clear path from A1 to C2 proficiency levels. Our
          platform combines the rigor of the Common European Framework of Reference (CEFR) with
          engaging, modern teaching methods that make learning both effective and enjoyable.
        </Typography>
        <Typography variant="body1" color="primary">
          Perfect for professionals advancing their careers, students preparing for exams, or anyone
          seeking to communicate confidently in English—Voqu adapts to your goals, schedule, and
          learning style.
        </Typography>
      </Box>
    </>
  );
}
const styles = {
  main: {
    display: 'flex',
    py: '30px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    gap: '40px',
    width: '85%',
    margin: '0 auto',
  },
};

export default IntroSection;
