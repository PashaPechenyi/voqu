import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionCard from '@/shared/components/AccordionCard/AccordionCard';
import { Box } from '@mui/material';
import { LevelDemo } from '@/features/levels/types/levelDemo.types';
const levels: LevelDemo[] = [
  {
    level: 'A1-Beginner',
    description: 'Can understand and use familiar everyday expressions and very basic phrases.',
    skills: [
      'Introduce yourself and others',
      'Ask and answer simple personal questions',
      'Interact in a simple way with slow, clear speech',
      'Understand basic signs and notices',
    ],
  },
  {
    level: 'A2-Elementary',
    description:
      'Can communicate in simple and routine tasks requiring direct exchange of information.',
    skills: [
      'Describe your background and immediate environment',
      'Express immediate needs in simple terms',
      'Understand frequently used expressions',
      'Handle simple, direct exchanges',
    ],
  },
];

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: '1.5px, solid grey',
  borderRadius: '10px',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },

  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {levels.map((level, ind) => (
        <Accordion
          key={ind}
          expanded={expanded === `panel${ind + 1}`}
          onChange={(_event: React.SyntheticEvent, newExpanded: boolean) =>
            handleChange(`panel${ind + 1}`, newExpanded)
          }
        >
          <AccordionSummary>
            <Typography component="span" color="secondary">
              {level.level}
            </Typography>
          </AccordionSummary>
          <AccordionCard skills={level.skills} description={level.description} />
        </Accordion>
      ))}
    </Box>
  );
}
