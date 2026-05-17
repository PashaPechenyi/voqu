import { Box, Card, CardContent, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { FEATURE_CARDS } from '../constants/featureCards.const';

function FeaturesSection() {
  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h3">Чому обирають Voqu?</Typography>
      <Box sx={sxStyles.cards}>
        {FEATURE_CARDS.map(({ id, Icon, title, subtitle }) => (
          <Card key={id} sx={sxStyles.card}>
            <CardContent sx={sxStyles.cardContent}>
              <Box sx={sxStyles.iconBox}>
                <Icon color="secondary" sx={{ fontSize: 40 }} />
              </Box>
              <Box sx={{ maxWidth: '170px' }}>
                <Typography variant="h6">{title}</Typography>
                <Typography color="textDisabled" variant="body1">
                  {subtitle}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    mb: 5,
  },
  cards: (theme) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    mt: 3,
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  }),
  card: (theme) => ({
    width: '90%',
    height: '100%',
    padding: 2,
    border: '2px solid',
    borderColor: 'primary.main',
    [theme.breakpoints.up('sm')]: {
      width: '45%',
    },
  }),
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    textAlign: 'center',
    bgcolor: 'secondary.main',
  },
  iconBox: {
    width: 45,
    height: 45,
    bgcolor: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default FeaturesSection;
