import {
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import { CefrLevel } from '@/features/levels/types/cefrLevel.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type AboutUsCefrAccordionProps = {
  cefrLevel: CefrLevel;
  expanded: number | false;
  onExpandedChange: (id: number | false) => void;
};

function AboutUsCefrAccordion({
  cefrLevel,
  expanded,
  onExpandedChange,
}: AboutUsCefrAccordionProps) {
  return (
    <Accordion
      sx={sxStyles.accordion}
      expanded={expanded === cefrLevel.id}
      onChange={(_, isExpanded) => onExpandedChange(isExpanded ? cefrLevel.id : false)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${cefrLevel.id}-content`}
        id={`panel-${cefrLevel.id}-header`}
      >
        <Typography component="span">{cefrLevel.level}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={sxStyles.root}>
        <Typography>{cefrLevel.description}</Typography>

        <List>
          {cefrLevel.skills.map((skill) => (
            <ListItem key={skill}>
              <ListItemIcon>
                <TaskAltIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={skill} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    textAlign: 'left',
    alignItems: 'center',
    gap: 3,
    maxWidth: '80%',
  },
  accordion: {
    border: '2px solid',
    borderColor: 'secondary.main',
    mb: 1,
  },
});

export default AboutUsCefrAccordion;
