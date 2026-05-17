import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LANDING_PAGE_URL } from '@/shared/constants/urls.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const NotFoundPage: FC = () => {
  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h2" color="secondary">
        404
      </Typography>
      <Typography variant="h4" color="primary">
        Page not found
      </Typography>
      <Button component={Link} to={LANDING_PAGE_URL} variant="contained" color="tertiary">
        Back home
      </Button>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    minHeight: '60vh',
  },
});

export default NotFoundPage;
