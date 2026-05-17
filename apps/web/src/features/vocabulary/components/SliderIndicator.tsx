import { FC } from 'react';
import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type SliderIndicatorProps = {
  total: number;
  activeIndex: number;
};

const SliderIndicator: FC<SliderIndicatorProps> = ({ total, activeIndex }) => {
  return (
    <Box sx={sxStyles.root}>
      {Array.from({ length: total }).map((_, ind) => (
        <Box key={ind} sx={ind === activeIndex ? sxStyles.activeDot : sxStyles.dot} />
      ))}
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: { display: 'flex', gap: '5px', px: '20px', alignItems: 'center' },
  dot: (theme) => ({
    width: '8px',
    height: '8px',
    borderRadius: '100%',
    backgroundColor: theme.palette.divider,
  }),
  activeDot: (theme) => ({
    width: '10px',
    height: '10px',
    borderRadius: '100%',
    backgroundColor: theme.palette.primary.main,
  }),
});

export default SliderIndicator;
