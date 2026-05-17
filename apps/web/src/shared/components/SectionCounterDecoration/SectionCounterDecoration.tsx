import { FC } from 'react';
import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type SectionCounterDecorationProps = {
  index: number;
};

const SectionCounterDecoration: FC<SectionCounterDecorationProps> = ({ index }) => {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.upperLine} />
      <Box sx={sxStyles.badge}>{index + 1}</Box>
      <Box sx={sxStyles.lowerLine} />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: {
    width: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperLine: (theme) => ({
    height: '95px',
    width: '3px',
    backgroundColor: theme.palette.divider,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  badge: (theme) => ({
    width: '70px',
    height: '70px',
    borderRadius: '100%',
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    border: `5px solid ${theme.palette.background.paper}`,
  }),
  lowerLine: (theme) => ({
    height: '115px',
    width: '3px',
    backgroundColor: theme.palette.divider,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export default SectionCounterDecoration;
