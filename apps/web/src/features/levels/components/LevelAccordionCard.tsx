import { FC } from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LevelAccordionCardProps = {
  skills: string[];
  description: string;
  skillsTitle?: string;
};

const LevelAccordionCard: FC<LevelAccordionCardProps> = ({
  skills,
  description,
  skillsTitle = "Skills You'll Acquire:",
}) => {
  return (
    <AccordionDetails>
      <Box sx={sxStyles.descriptionWrapper}>
        <Box sx={sxStyles.descriptionRow}>
          <Box sx={sxStyles.bar} />
          <Typography color="primary" variant="body1">
            {description}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" color="secondary" sx={sxStyles.skillsTitle}>
        {skillsTitle}
      </Typography>
      {skills.map((skill) => (
        <Box key={skill} sx={sxStyles.skillRow}>
          <CheckCircleOutlineIcon color="secondary" />
          <Typography variant="body1" sx={sxStyles.skillText}>
            {skill}
          </Typography>
        </Box>
      ))}
    </AccordionDetails>
  );
};

const sxStyles = createSxStylesList({
  descriptionWrapper: { mt: '25px' },
  descriptionRow: { display: 'flex', gap: '20px' },
  bar: (theme) => ({
    width: '5px',
    minHeight: '27px',
    backgroundColor: theme.palette.divider,
  }),
  skillsTitle: { my: '20px' },
  skillRow: { display: 'flex', gap: '5px' },
  skillText: { width: '90%' },
});

export default LevelAccordionCard;
