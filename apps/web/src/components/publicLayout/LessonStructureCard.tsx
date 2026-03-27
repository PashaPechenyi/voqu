import { Box, Typography } from '@mui/material';
import React from 'react';
type LessonStructureCardProps = {
  alingItems: string;
  icon: any;
  title: string;
  description: string;
  textAling: string;
  order: number;
  width: string | { xs: string; sm: string };
};

function LessonStructureCard({
  icon,
  title,
  description,
  alingItems,
  textAling,
  order,
  width,
}: LessonStructureCardProps) {
  const Icon = icon;
  return (
    <Box sx={{ alignItems: alingItems, width: width, ...styles.card }}>
      <Box sx={styles.header}>
        <Box color="secondary" sx={{ order: order, ...styles.icon }}>
          <Icon sx={{ fill: 'white', fontSize: '28px' }} />
        </Box>
        <Typography variant="h6" sx={{ textAlign: textAling, mx: '10px', order: 2 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ textAlign: textAling }}>
        {description}
      </Typography>
    </Box>
  );
}
const styles = {
  header: {
    with: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '50px',
    height: '50px',
    borderRadius: '100%',
    backgroundColor: '#37123c',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    p: '15px',
    border: '1.5px, solid grey',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '200px',
    gap: '20px',
    my: '20px',
  },
};

export default LessonStructureCard;
