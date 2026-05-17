import { Box, Typography } from '@mui/material';
import { ABOUT_US_METHODOLOGY_CARDS } from '../constants/aboutUsMethodologyCards.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import MethodologyCard from '@/shared/components/MethodologyCard/MethodologyCard';

function AboutUsMethodologySection() {
  return (
    <>
      <Box sx={sxStyles.root}>
        <Typography variant="h4">How Our Lessons Work</Typography>
        <Typography variant="body1" color="primary">
          Every Voqu lesson follows a proven 4-step methodology designed to maximize retention and
          ensure you can confidently use what you learn in real-world situations.
        </Typography>
      </Box>

      <Box>
        {ABOUT_US_METHODOLOGY_CARDS.map((card) => {
          const isReversed = card.id % 2 === 0;
          return (
            <Box
              key={card.id}
              sx={{
                ...sxStyles.pointBlock,
                ...(isReversed ? { flexDirection: 'row-reverse' } : null),
              }}
            >
              <MethodologyCard card={card} />
              <Box sx={sxStyles.lessonPhaseNumber}>
                <Box color="secondary.main" sx={sxStyles.pointNumber}>
                  {card.id}
                </Box>
                <Box sx={sxStyles.middleLine} />
              </Box>
            </Box>
          );
        })}
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
  pointNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'primary.main',
    border: '3px solid',
    borderColor: 'background.default',
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
  lessonPhaseNumber: (theme) => ({
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

export default AboutUsMethodologySection;
