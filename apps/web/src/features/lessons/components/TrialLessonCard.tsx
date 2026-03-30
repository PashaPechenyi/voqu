import { Button, Typography, Card } from '@mui/material';

function TrialLessonCard() {
  return (
    <Card
      sx={{
        border: '3px, solid grey',
        borderRadius: '10px',
        width: { xs: 1, md: '700px' },
        py: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        m: '0 auto',
        mt: '40px',
      }}
    >
      <Typography color="primary" variant="body2" sx={{ textAlign: 'center' }}>
        This is just a glimpse of our comprehensive vocabulary lessons
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        sx={{
          width: '50%',
          height: '50px',
          color: 'white',

          '&:hover': { backgroundColor: '#71677D' },
        }}
      >
        Start Learning Today
      </Button>
    </Card>
  );
}

export default TrialLessonCard;
