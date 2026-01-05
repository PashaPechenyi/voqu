import { createSxStylesList } from '@/theme/helpers';
import { Box, Button, Stack, Typography } from '@mui/material';
import { theme } from '@/theme';

export default function HeroSection() {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.box}>
        <Box sx={sxStyles.titles}>
          <Typography variant="h3" component="h1" gutterBottom>
            Вивчай англійську крок за кроком
          </Typography>
          <Typography variant="h5" color="text.disabled" sx={{ mb: 4, maxWidth: 600 }}>
            Структуровані уроки від початківця до просунутого рівня для українців
          </Typography>
        </Box>

        <Box sx={sxStyles.imgBox}>
          <Box
            component="img"
            sx={sxStyles.imgStyles}
            src="https://images.unsplash.com/photo-1763770446725-1086cbb36d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZW5nbGlzaCUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjQ1Mjc5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="#"
          />
          <Box sx={sxStyles.happyStudents}>
            <Typography color={'secondary'} variant="h3">
              500+
            </Typography>
            <Typography color={'secondary'}>Happy Students</Typography>
          </Box>
        </Box>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={sxStyles.btns}>
        <Button variant="contained" size="large">
          Почати безкоштовно
        </Button>
        <Button variant="outlined" size="large">
          Дізнатися більше
        </Button>
      </Stack>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      alignContent: 'flex-start',
    },
  },
  happyStudents: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    bgcolor: 'primary.main',
    width: 150,
    border: '2px solid ',
    borderRadius: 1,
    position: 'absolute',
    transform: 'translate(5%,25%)',
    bottom: '0',
    right: '0',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 200,
      padding: 0,
      transform: 'translate(-5%,25%)',
    },
  },
  imgBox: {
    position: 'relative',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      alignContent: 'flex-start',
    },
  },
  imgStyles: (theme) => ({
    width: '80%',
    height: '100%',
    border: '4px solid #A99F96',
    borderRadius: '10px',
    [theme.breakpoints.between('xs', 'md')]: {
      width: '90%',
    },
  }),
  btns: {
    mt: 3,
    mb: 12,
  },

  titles: {
    maxWidth: '45%',
    [theme.breakpoints.between('xs', 'md')]: {
      maxWidth: '80%',
    },
  },
});
