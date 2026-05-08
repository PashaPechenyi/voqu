import { Card, CardContent, Typography } from '@mui/material';

type CourseSummaryCardProps = {
  value: number;
  text: string;
};

function CourseSummaryCard({ value, text }: CourseSummaryCardProps) {
  return (
    <Card sx={{ p: '20px 50px', textAlign: 'center', border: '2px solid grey', width: 1 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography color="secondary" variant="h5">
          {value}
        </Typography>
        <Typography color="primary" variant="body1">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CourseSummaryCard;
