import CustomizedAccordions from '@/components/publicLayout/Accordion';
import {  AccordionSummary, Box, Typography } from '@mui/material'

import React from 'react'

function LevelsDescription() {
  return (
    <>
     <Box sx={styles.main} >
        <Typography variant="h4">CEFR Proficiency Levels</Typography>
        <Typography variant="body1" color="primary">
           The Common European Framework of Reference provides a standardized way to measure language proficiency. Explore each level to understand your current standing and plan your learning path.
        </Typography>
        
   </Box>
    <CustomizedAccordions/>
    </>
  )


}
  const styles = {
  main: {
    display: 'flex',
    py: '30px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    gap: '40px',
    width: '65%',
    margin: '0 auto',
  },
};

export default LevelsDescription
