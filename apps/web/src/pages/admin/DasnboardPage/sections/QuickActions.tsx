import React from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Card, CardContent, Typography } from '@mui/material';
const CARDS = [
  { icon: ImportContactsIcon, description: 'Manage Courses' },
  { icon: GroupIcon, description: 'Manage users' },
  { icon: TrendingUpIcon, description: 'View Reports' },
  { icon: TimelineIcon, description: 'Settings' },
];
function QuickActions() {
  return (
    <Box
      sx={{
        width: 1,
        border: '3px solid grey',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems:"start",
        justifyContent:"start",
        p: '30px',
        gap: '20px',
        my:"40px",
        backgroundColor:"rgba(164, 148, 137, 0.41)"
      }}
    >
      <Typography variant="h5" color="secondary">
        Quick Actions
      </Typography>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '10px',
          m: 0,
        }}
      >
        {CARDS.map((el) => {
          const Icon = el.icon;
          return (
            <Card
              sx={{
                width: { xs: 1, sm: '23%' },
                textAlign: 'center',
                p: '15px 0  0 0 ',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid grey',
              }}
            >
              <Icon fontSize="large" sx={{ fill: 'grey' }} />

              <CardContent>
                <Typography gutterBottom variant="body1" color="secondary">
                  {el.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default QuickActions;
