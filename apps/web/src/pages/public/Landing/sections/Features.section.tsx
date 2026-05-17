import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import aboutUsImage from '@/assets/images/aboutUsImg.jpg';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type Feature = {
  id: string;
  icon: SvgIconComponent;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: 'expert-teachers',
    icon: WorkspacePremiumIcon,
    title: 'Expert Teachers',
    description: 'Learn from certified native speakers with years of experience',
  },
  {
    id: 'small-class-sizes',
    icon: GroupIcon,
    title: 'Small Class Sizes',
    description: 'Get personalized attention in our intimate learning environment',
  },
  {
    id: 'proven-methods',
    icon: ImportContactsIcon,
    title: 'Proven Methods',
    description: 'Our curriculum is designed for maximum retention and progress',
  },
  {
    id: 'global-community',
    icon: LanguageIcon,
    title: 'Global Community',
    description: 'Connect with learners from around the world',
  },
];

const FeaturesSection: FC = () => {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.headerBox}>
        <Typography variant="h3">About us</Typography>
        <Typography variant="body1" sx={sxStyles.muted}>
          We are dedicated to helping students achieve their English language goals through
          innovative teaching methods and personalized support.
        </Typography>
      </Box>

      <Box sx={sxStyles.aboutRow}>
        <Box component="img" src={aboutUsImage} sx={sxStyles.aboutImage} />
        <Box sx={sxStyles.aboutCopy}>
          <Typography variant="h4">Why Choose Voqu?</Typography>
          <Typography sx={sxStyles.muted} variant="body1">
            For over 10 years, we've been at the forefront of English language education, helping
            thousands of students from beginners to advanced learners achieve their goals. Our
            approach combines traditional teaching excellence with modern technology to create an
            engaging and effective learning experience.
          </Typography>
          <Typography variant="body1" sx={sxStyles.muted}>
            Whether you're preparing for exams, advancing your career, or simply want to
            communicate confidently in English, we have the perfect program for you.
          </Typography>
        </Box>
      </Box>
      <Box sx={sxStyles.cardsRow}>
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.id} sx={sxStyles.card}>
              <Box sx={sxStyles.iconCircle}>
                <Icon fontSize="large" sx={sxStyles.iconColor} />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={sxStyles.cardBody}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: '50px',
    gap: '30px',
  },
  headerBox: { width: { xs: 1, md: '50%' }, textAlign: 'center' },
  muted: (theme) => ({ color: theme.palette.primary.main }),
  cardBody: (theme) => ({ color: theme.palette.divider }),
  aboutRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 1,
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    gap: '20px',
  },
  aboutImage: (theme) => ({
    width: { xs: 1, md: '45%' },
    border: `5px solid ${theme.palette.divider}`,
    borderRadius: '10px',
  }),
  aboutCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: { xs: 1, md: '50%' },
  },
  cardsRow: {
    width: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '10px',
  },
  card: (theme) => ({
    width: { xs: 1, sm: '23%' },
    textAlign: 'center',
    py: '30px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px solid ${theme.palette.divider}`,
  }),
  iconCircle: (theme) => ({
    width: '70px',
    height: '70px',
    borderRadius: '100%',
    border: `3px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  }),
  iconColor: (theme) => ({ fill: theme.palette.divider }),
});

export default FeaturesSection;
