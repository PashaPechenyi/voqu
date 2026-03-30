import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import TimelineIcon from '@mui/icons-material/Timeline';

const ACTIVITIES = [
  { type: 'New course published', name: 'Business English Advanced', time: '2 hours ago' },
  { type: 'New course published', name: 'Business English Advanced', time: '2 hours ago' },
];
function StatisticsCard() {
  return (
    <Card
      sx={{
        width: { xs: 1, md: '50%' },
        border: '3px, solid grey',
        borderRadius: '10px',
        py: '20px',
      }}
    >
      <CardContent sx={{ px: '20px', mt: '20px' }}>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', pb: '30px' }}>
          <TimelineIcon fontSize="large" sx={{ fill: 'grey' }} />
          <Typography variant="h4">Recent Activity</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '10px', mt: '13px', flexDirection: 'column' }}>
          {ACTIVITIES.map((el) => {
            return (
              <Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'red',
                      borderRadius: '100%',
                    }}
                  ></Box>
                  <Typography color="secondary" variant="body3">
                    {el.type}
                  </Typography>
                </Box>
                <Box sx={{ ml: '20px' }}>
                  <Typography variant="body1" color="primary">
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="tertiary">
                    {el.time}
                  </Typography>
                </Box>

                <Box sx={{ height: '1.5px', backgroundColor: 'grey', width: 1, my: '40px' }} />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatisticsCard;
