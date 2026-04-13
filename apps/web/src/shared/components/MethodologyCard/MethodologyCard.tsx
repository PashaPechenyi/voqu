import { Box, Card, CardContent, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { MethodologyCardData } from './MethodologyCard.types';

type MethodologyCardProps = {
  cardData: MethodologyCardData;
};

function MethodologyCard({ cardData }: MethodologyCardProps) {
  return (
    <Card sx={sxStyles.point}>
      <CardContent>
        <Box sx={sxStyles.pointTitleRoot}>
          <Typography variant="h6">{cardData.title}</Typography>
          <Box sx={sxStyles.imgBackground}>
            <cardData.Icon color="secondary" />
          </Box>
        </Box>
        <Typography variant="body1" color="primary" textAlign={'right'}>
          {cardData.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
const sxStyles = createSxStylesList({
  middleLine: {
    width: '3px',
    backgroundColor: 'oklch(.708 0 0)',
    height: '120%',
    //flex: 1,
  },

  point: (theme) => ({
    p: 3,
    border: '2px solid',
    borderColor: 'oklch(.708 0 0)',
    boxShadow: '0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 'calc((100% - 100px) / 2)',
    },
  }),
  pointTitleRoot: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 2,
  },
  imgBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgb(55, 18, 60)',
    p: 2,
    borderRadius: '100%',
  },
});

export default MethodologyCard;
