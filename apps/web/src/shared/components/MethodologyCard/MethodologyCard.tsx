import { Box, Card, CardContent, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { MethodologyCardItem } from './MethodologyCard.type';

type MethodologyCardProps = {
  card: MethodologyCardItem;
};

function MethodologyCard({ card: { title, description, Icon } }: MethodologyCardProps) {
  return (
    <Card sx={sxStyles.point}>
      <CardContent>
        <Box sx={sxStyles.pointTitleRoot}>
          <Typography variant="h6">{title}</Typography>
          <Box sx={sxStyles.imgBackground}>
            <Icon color="secondary" />
          </Box>
        </Box>
        <Typography variant="body1" color="primary" textAlign="right">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

const sxStyles = createSxStylesList({
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
    backgroundColor: 'adminPrimary.main',
    p: 2,
    borderRadius: '100%',
  },
});

export default MethodologyCard;
