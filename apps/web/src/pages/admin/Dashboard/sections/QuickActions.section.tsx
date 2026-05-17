import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { QUICK_ACTIONS } from './constants/quickActions.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const QuickActionsSection: FC = () => {
  return (
    <Box sx={sxStyles.container}>
      <Typography variant="h5" color="secondary">
        Quick Actions
      </Typography>
      <Box sx={sxStyles.cards}>
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.description}
              component={Link}
              to={action.url}
              sx={sxStyles.buttonCard}
            >
              <Icon fontSize="large" sx={sxStyles.icon} />
              <Box sx={sxStyles.labelWrapper}>
                <Typography gutterBottom variant="body1" color="secondary">
                  {action.description}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  container: (theme) => ({
    width: 1,
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    p: '30px',
    gap: '20px',
    my: '40px',
    backgroundColor: theme.palette.action.hover,
  }),
  cards: {
    width: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '10px',
    m: 0,
  },
  buttonCard: (theme) => ({
    width: { xs: 1, sm: '23%' },
    textAlign: 'center',
    p: '15px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
  }),
  icon: (theme) => ({ fill: theme.palette.divider }),
  labelWrapper: { p: '30px' },
});

export default QuickActionsSection;
