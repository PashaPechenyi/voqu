import { FC } from 'react';
import { Box } from '@mui/material';
import PopularCoursesList from '@/features/courses/components/PopularCoursesList';
import RecentActivityCard from '@/features/statistics/components/RecentActivityCard';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const StatisticsSection: FC = () => {
  return (
    <Box sx={sxStyles.root}>
      <RecentActivityCard />
      <PopularCoursesList />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' },
});

export default StatisticsSection;
