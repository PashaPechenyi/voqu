import { Box, Typography, Button, Stack } from '@mui/material';

export function LandingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Learn English with Voqu SONICHKA HOCHIT PLAKAT
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        A self-paced learning platform with structured progression from A1 to C2
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" size="large">
          Get Started
        </Button>
        <Button variant="outlined" size="large">
          Learn More
        </Button>
      </Stack>
    </Box>
  );
}
