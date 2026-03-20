import { MethodologyCards } from '@/consts/aboutUs';
import { createSxStylesList } from '@/theme/helpers';
import { Box, Typography } from '@mui/material';
import MethodologyCard from './MethodologyCard';
const DATA = MethodologyCards;
export default function AboutUsMethodologySection() {
  return (
    <>
      <Box sx={sxStyles.root}>
        <Typography variant="h4">How Our Lessons Work</Typography>
        <Typography variant="body1" color={'primary'}>
          Every Voqu lesson follows a proven 4-step methodology designed to maximize retention and
          ensure you can confidently use what you learn in real-world situations.
        </Typography>
        <Box sx={sxStyles.pointsRoot}></Box>
      </Box>

      <Box>
        {DATA.map((cardData, cardIndex) => (
          <Box key={cardIndex} sx={sxStyles.pointBlock} dir={cardData.id % 2 === 0 ? 'rtl' : 'ltr'}>
            <MethodologyCard cardData={cardData} />
            <Box sx={sxStyles.lessonPhazeNumber}>
              <Box color="secondary.main" sx={sxStyles.pointNumber}>
                {cardData.id}
              </Box>
              <Box sx={sxStyles.middleLine}></Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
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
  middleLine: {
    width: '3px',
    backgroundColor: 'oklch(.708 0 0)',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    zIndex: -1,
  },
  pointsRoot: {
    display: 'flex',
    flexDirection: 'row',
  },
  pointNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'primary.main',
    border: '3px solid',
    borderColor: 'background',
    boxShadow: '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a',
    height: '65px',
    width: '65px',
    p: 3,
    borderRadius: '100%',
  },
  pointBlock: (theme) => ({
    p: 2,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      p: 0,
    },
  }),
  lessonPhazeNumber: (theme) => ({
    position: 'relative',
    display: 'none',
    p: '17.5px',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
    },
  }),
});
