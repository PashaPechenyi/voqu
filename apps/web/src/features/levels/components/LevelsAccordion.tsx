import { FC, SyntheticEvent, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import LevelAccordionCard from './LevelAccordionCard';
import { MOCK_LEVELS } from '../constants/mockLevels.const';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1.5px solid ${theme.palette.divider}`,
  borderRadius: '10px',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
}));

const LevelsAccordion: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {MOCK_LEVELS.map((level) => (
        <Accordion
          key={level.label}
          expanded={expanded === level.label}
          onChange={handleChange(level.label)}
        >
          <AccordionSummary>
            <Typography component="span" color="secondary">
              {level.label}
            </Typography>
          </AccordionSummary>
          <LevelAccordionCard skills={level.skills} description={level.description} />
        </Accordion>
      ))}
    </Box>
  );
};

export default LevelsAccordion;
