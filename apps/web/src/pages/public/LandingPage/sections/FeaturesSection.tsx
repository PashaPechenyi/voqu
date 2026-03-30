import { Box, Typography } from '@mui/material';
import img from '@/img/aboutUsImg.jpg';
import icon from '@/img/diamond.png';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LanguageIcon from '@mui/icons-material/Language';
import CardActionArea from '@mui/material/CardActionArea';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SectionDevider from '@/components/publicLayout/SectionDevider';

function FeaturesSection() {
  return (
    <>
      <SectionDevider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: '50px',
          gap: '30px',
        }}
      >
        <Box sx={{ width: { xs: 1, md: '50%' }, textAlign: 'center' }}>
          <Typography variant="h3">About us</Typography>
          <Typography variant="body1" sx={{ color: '#71677D' }}>
            We are dedicated to helping students achieve their English language goals through
            innovative teaching methods and personalized support.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 1,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Box
            component="img"
            src={img}
            sx={{
              width: { xs: 1, md: '45%' },
              border: '5px solid grey',
              borderRadius: '10px',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: { xs: 1, md: '50%' },
            }}
          >
            <Typography variant="h4">Why Choose EnglishPro?</Typography>
            <Typography sx={{ color: '#71677D' }} variant="body1">
              For over 10 years, we've been at the forefront of English language education, helping
              thousands of students from beginners to advanced learners achieve their goals. Our
              approach combines traditional teaching excellence with modern technology to create an
              engaging and effective learning experience.
            </Typography>
            <Typography variant="body1" sx={{ color: '#71677D' }}>
              {' '}
              Whether you're preparing for exams, advancing your career, or simply want to
              communicate confidently in English, we have the perfect program for you.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <Card
            sx={{
              width: { xs: 1, sm: '23%' },
              textAlign: 'center',
              py: '30px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid grey',
            }}
          >
            <Box
              sx={{
                width: '70px',
                height: '70px',
                borderRadius: '100%',
                border: '3px solid grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              <WorkspacePremiumIcon fontSize="large" sx={{ fill: 'grey' }} />
            </Box>

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Expert Teachers
              </Typography>
              <Typography variant="body2" color="grey">
                Learn from certified native speakers with years of experience
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: { xs: 1, sm: '23%' },
              textAlign: 'center',
              py: '30px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid grey',
            }}
          >
            <Box
              sx={{
                width: '70px',
                height: '70px',
                borderRadius: '100%',
                border: '3px solid grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              <GroupIcon fontSize="large" sx={{ fill: 'grey' }} />
            </Box>

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Small Class Sizes
              </Typography>
              <Typography variant="body2" color="grey">
                Get personalized attention in our intimate learning environment
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: { xs: 1, sm: '23%' },
              textAlign: 'center',
              py: '30px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid grey',
            }}
          >
            <Box
              sx={{
                width: '70px',
                height: '70px',
                borderRadius: '100%',
                border: '3px solid grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              <ImportContactsIcon fontSize="large" sx={{ fill: 'grey' }} />
            </Box>

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Proven Methods
              </Typography>
              <Typography variant="body2" color="grey">
                Our curriculum is designed for maximum retention and progress
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: { xs: 1, sm: '23%' },
              textAlign: 'center',
              py: '30px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid grey',
            }}
          >
            <Box
              sx={{
                width: '70px',
                height: '70px',
                borderRadius: '100%',
                border: '3px solid grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              <LanguageIcon fontSize="large" sx={{ fill: 'grey' }} />
            </Box>

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Global Community
              </Typography>
              <Typography variant="body2" color="grey">
                Connect with learners from around the world
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default FeaturesSection;
