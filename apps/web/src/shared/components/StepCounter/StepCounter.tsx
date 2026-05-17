import { FC } from 'react';
import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type StepCounterProps = {
  activeIndex: number;
  total: number;
};

const StepCounter: FC<StepCounterProps> = ({ total, activeIndex }) => {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.badge}>{activeIndex + 1}</Box>
      of {total}
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: (theme) => ({
    color: theme.palette.primary.main,
    display: 'flex',
    gap: '10px',
    fontSize: '16px',
  }),
  badge: (theme) => ({
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export default StepCounter;
