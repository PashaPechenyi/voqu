import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '@/assets/images/img1.jpg';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const HeroSection: FC = () => {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.leftColumn}>
        <Box sx={sxStyles.tag}>Established Since 2025</Box>
        <Box>
          <Typography variant="h2" sx={sxStyles.heading}>
            Master English with Confidence
          </Typography>
          <Typography variant="body1" sx={sxStyles.subtitle}>
            Transform your language skills with personalized lessons from expert teachers. Start
            your journey to fluency today.
          </Typography>
        </Box>
        <Box sx={sxStyles.ctaRow}>
          <Button color="tertiary" variant="contained" sx={sxStyles.primaryCta}>
            Get started
          </Button>
          <Button variant="outlined" sx={sxStyles.secondaryCta}>
            Learn more
          </Button>
        </Box>
      </Box>
      <Box sx={sxStyles.rightColumn}>
        <Box sx={sxStyles.imageWrapper}>
          <Box component="img" src={heroImage} sx={sxStyles.heroImage} />
          <Box sx={sxStyles.statCard}>
            <Box sx={sxStyles.statCardInner}>
              <Typography variant="h5">500+</Typography>
              <Typography variant="body1" sx={sxStyles.statCaption}>
                Happy students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: { xs: 'column', sm: 'row' },
    minHeight: '60vh',
    textAlign: 'center',
    gap: { xs: '70px', sm: '60px', lg: '120px' },
    width: 1,
    py: '40px',
  },
  leftColumn: { width: { xs: 1, sm: '50%' }, gap: '20px' },
  tag: (theme) => ({
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '20px',
    lineHeight: '18px',
    p: '5px',
    width: '220px',
    height: '30px',
    mb: '20px',
  }),
  heading: (theme) => ({
    color: theme.palette.secondary.main,
    textAlign: 'start',
    mb: '20px',
    typography: { xs: 'h3', sm: 'h2' },
  }),
  subtitle: (theme) => ({
    color: theme.palette.primary.main,
    textAlign: 'start',
    mb: '20px',
  }),
  ctaRow: {
    display: 'flex',
    width: 1,
    gap: '10px',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  primaryCta: (theme) => ({
    width: { xs: 1, sm: '140px' },
    height: '50px',
    color: theme.palette.common.white,
    '&:hover': { backgroundColor: theme.palette.primary.main },
  }),
  secondaryCta: (theme) => ({
    width: { xs: 1, sm: '140px' },
    height: '50px',
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }),
  rightColumn: {
    width: { xs: 1, sm: '50%' },
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageWrapper: { width: 1, position: 'relative' },
  heroImage: (theme) => ({
    width: { xs: 1, sm: '90%' },
    border: `5px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    m: 0,
    mb: '5%',
  }),
  statCard: (theme) => ({
    width: '40%',
    minWidth: '160px',
    color: theme.palette.common.white,
    display: { xs: 'none', sm: 'block' },
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    border: `2px solid ${theme.palette.common.black}`,
    borderRadius: '10px',
    position: 'absolute',
    bottom: '0',
    right: '0',
  }),
  statCardInner: { textAlign: 'center', py: '25px' },
  statCaption: (theme) => ({
    typography: { md: 'body1', xs: 'body2' },
    color: theme.palette.common.white,
  }),
});

export default HeroSection;
