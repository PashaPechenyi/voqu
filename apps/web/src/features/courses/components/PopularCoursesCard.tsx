import { Box, Card, CardContent, Slider, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
const COURSES = [
  { name: 'English Grammar Essentials', studentAmmount: 342, percent: 72 },
  { name: 'Advanced Vocabulary Builder', studentAmmount: 289, percent: 65 },
  { name: 'Everyday Conversations', studentAmmount: 256, percent: 81 },
  { name: 'Listening Comprehension', studentAmmount: 198, percent: 58 },
];

function PopularCoursesCard() {
  return (
    <Card
      sx={{
        width: { xs: 1, md: '50%' },
        border: '3px, solid grey',
        borderRadius: '10px',
        py: '20px',
        mt: '30px',
      }}
    >
      <CardContent sx={{ px: '20px', mt: '20px' }}>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', pb: '30px' }}>
          <TrendingUpIcon fontSize="large" sx={{ fill: 'grey' }} />
          <Typography variant="h4">Popular Courses</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '20px', mt: '13px', flexDirection: 'column' }}>
          {COURSES.map((el) => {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', py: '10px' }}>
                <Typography color="secondary" variant="body3">
                  {el.name}
                </Typography>

                <Typography variant="body1" color="primary">
                  {el.studentAmmount} students enrolled
                </Typography>
                <Box
                  sx={{ display: 'flex', gap: '5px', alignItems: 'center', textAlign: 'center' }}
                >
                  <Slider
                    disabled
                    defaultValue={el.percent}
                    sx={{
                      '& .MuiSlider-thumb': {
                        display: 'none',
                      },
                    }}
                  />
                  <Typography variant="body1" color="primary">
                    {el.percent}%
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default PopularCoursesCard;
