import { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type CourseSummaryCardProps = {
  value: number;
  label: string;
};

const CourseSummaryCard: FC<CourseSummaryCardProps> = ({ value, label }) => {
  return (
    <Card sx={sxStyles.card}>
      <CardContent sx={sxStyles.content}>
        <Typography color="secondary" variant="h5">
          {value}
        </Typography>
        <Typography color="primary" variant="body1">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: (theme) => ({
    p: '20px 50px',
    textAlign: 'center',
    border: `2px solid ${theme.palette.divider}`,
    width: 1,
  }),
  content: { display: 'flex', flexDirection: 'column', gap: '20px' },
});

export default CourseSummaryCard;
