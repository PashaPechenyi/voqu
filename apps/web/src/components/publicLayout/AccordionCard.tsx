import { AccordionDetails, Box, Typography } from '@mui/material';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type AccordionCardType = {
  skills: string[];
  description: string;
};
function AccordionCard({ skills, description }: AccordionCardType) {
  return (
    <AccordionDetails >
      <Box sx={{ mt: '25px',   }}>
        <Box sx={{ display: 'flex', gap: '20px', }}>
          <Box sx={{ width: '5px', minHeight: '27px', backgroundColor: 'grey' }}></Box>
          <Typography color="primary" variant="body1">
            {description}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" color='secondary' sx={{my:"20px"}}>Skills You'll Acquire:</Typography>
      {skills.map((skill, ind) => (
        <Box key={ind} sx={{display:"fllex", gap:"5px"}}>
          <CheckCircleOutlineIcon color='secondary'/>
          <Typography variant="body1" sx={{  width:"90%"}}>{skill}</Typography>
        </Box>
      ))}
    </AccordionDetails>
  );
}

export default AccordionCard;
