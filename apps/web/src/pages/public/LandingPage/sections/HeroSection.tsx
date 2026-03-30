import { Box, Typography, Button } from '@mui/material';
import img from '@/img/img1.jpg';

function HeroSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'cenetr',
        justifyContent: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        minHeight: '60vh',
        textAlign: 'center',
        gap: { xs: '70px', sm: '60px', lg: '120px' },
        width: 1,
        py: '40px',
      }}
    >
      <Box
        sx={{
          width: { xs: 1, sm: '50%' },

          gap: '20px',
        }}
      >
        <Box
          sx={{
            color: '#37123c',
            border: '2px solid grey',
            borderRadius: '20px',
            lineHeight: '18px',
            p: '5px',
            width: '220px',
            height: '30px',
            mb: '20px',
          }}
        >
          Established Since 2025
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: '#37123c',
              textAlign: 'start',
              mb: '20px',
              //fontSize: { xs: '45px', md: '60px' },
              typography: { xs: 'h3', sm: 'h2' },
            }}
          >
            Master English with Confidence
          </Typography>
          <Typography variant="body1" sx={{ color: '#71677D', textAlign: 'start', mb: '20px' }}>
            Transform your language skills with personalized lessons from expert teachers. Start
            your journey to fluency today.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',

            width: 1,
            gap: '10px',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            color="tertiary"
            variant="contained"
            sx={{
              width: { xs: 1, sm: '140px' },
              height: '50px',
              color: 'white',
              //   backgroundColor: '#aa9f96',
              //fontSize: { xs: '12px', sm: '14px', md: '16px' },

              '&:hover': { backgroundColor: '#71677D' },
            }}
          >
            Get started
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: { xs: 1, sm: '140px' },
              height: '50px',
              //fontSize: { xs: '12px', sm: '14px', md: '16px' },
              border: '2px solid #71677D',

              '&:hover': { backgroundColor: '#71677D', color: 'white' },
            }}
          >
            Lern more
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: 1, sm: '50%' },
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: 1,

            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={img}
            sx={{
              width: { xs: 1, sm: '90%' },
              border: '5px solid grey',
              borderRadius: '10px',

              m: 0,
              mb: '5%',
            }}
          ></Box>
          <Box
            sx={{
              width: '40%',
              minWidth: '160px',
              color: 'white',
              display: { xs: 'none', sm: 'block' },
              backgroundColor: '#71677D',
              textAlign: 'center',
              border: '2px solid black',
              borderRadius: '10px',
              position: 'absolute',
              //   transform: 'translate(25%,25%)',
              bottom: '0',
              right: '0',
            }}
          >
            <Box sx={{ textAlign: 'cenetr', py: '25px' }}>
              <Typography variant="h5">500+</Typography>
              <Typography
                variant="body1"
                sx={{ typography: { md: 'body1', xs: 'body2' }, color: 'white' }}
              >
                {' '}
                Happy students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
