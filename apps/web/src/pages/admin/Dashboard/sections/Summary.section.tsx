import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { MOCK_SUMMARY_CARDS } from './constants/summaryCards.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const SummarySection: FC = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h2" sx={sxStyles.heading}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={sxStyles.subtitle}>
          Welcome back! Here's what's happening with Voqu today.
        </Typography>
      </Box>
      <Box sx={sxStyles.cardsRow}>
        {MOCK_SUMMARY_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.description} sx={sxStyles.card}>
              <Box sx={sxStyles.iconCircle}>
                <Icon sx={sxStyles.icon} />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                  {card.number}
                </Typography>
                <Typography variant="body1" color="primary">
                  {card.description}
                </Typography>
                <Typography variant="body2" color="tertiary">
                  {card.changes}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  heading: (theme) => ({
    color: theme.palette.secondary.main,
    textAlign: 'start',
    mb: '20px',
    pt: '40px',
    typography: { xs: 'h3', sm: 'h2' },
  }),
  subtitle: (theme) => ({
    color: theme.palette.primary.main,
    textAlign: 'start',
    mb: '20px',
  }),
  cardsRow: {
    width: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '10px',
  },
  card: (theme) => ({
    width: { xs: 1, sm: '23%' },
    p: '15px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    justifyContent: 'start',
    alignItems: 'start',
    border: `2px solid ${theme.palette.divider}`,
  }),
  iconCircle: (theme) => ({
    width: '55px',
    height: '55px',
    borderRadius: '100%',
    border: `2.5px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    m: '0 0 20px 15px',
  }),
  icon: (theme) => ({ fill: theme.palette.divider }),
});

export default SummarySection;
