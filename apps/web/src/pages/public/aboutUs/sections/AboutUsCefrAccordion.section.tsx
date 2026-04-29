import { useState } from 'react';
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

import { CefrLevel } from '@/features/levels/types/levelDemo.type/levelDemo.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type AboutUsCefrAccordionProps = {
  accordion: CefrLevel;
  expanded: number | false;
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
};

function AboutUsCefrAccordionSection({ accordion }: AboutUsCefrAccordionProps) {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <>
      <Accordion
        sx={sxStyles.accordion}
        expanded={expanded === accordion.id}
        onChange={(_, isExpanded) => setExpanded(isExpanded ? accordion.id : false)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${accordion.id}-content`}
          id={`panel-${accordion.id}-header`}
        >
          <Typography component="span">{accordion.level}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={sxStyles.root}>
          <Typography>{accordion.description}</Typography>

          <List>
            {accordion.skills.map((skill, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <TaskAltIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
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
    border: '2 px solid #F5F1ED',
    mb: 1,
  },
});

export default AboutUsCefrAccordionSection;
