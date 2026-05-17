import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { LessonCardStyle } from '../types/lessonCardStyle.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LessonStructureCardProps = {
  icon: SvgIconComponent;
  title: string;
  description: string;
  cardStyles: LessonCardStyle;
};

const LessonStructureCard: FC<LessonStructureCardProps> = ({
  icon: Icon,
  title,
  description,
  cardStyles,
}) => {
  return (
    <Box sx={[sxStyles.card, { alignItems: cardStyles.alignItems, width: cardStyles.width }]}>
      <Box sx={sxStyles.header}>
        <Box sx={[sxStyles.icon, { order: cardStyles.order }]}>
          <Icon sx={sxStyles.iconSvg} />
        </Box>
        <Typography variant="h6" sx={[sxStyles.title, { textAlign: cardStyles.textAlign }]}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ textAlign: cardStyles.textAlign }}>
        {description}
      </Typography>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  header: {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: (theme) => ({
    width: '50px',
    height: '50px',
    borderRadius: '100%',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  iconSvg: (theme) => ({ fill: theme.palette.common.white, fontSize: '28px' }),
  title: { mx: '10px', order: 2 },
  card: (theme) => ({
    p: '15px',
    border: `1.5px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '200px',
    gap: '20px',
    my: '20px',
  }),
});

export default LessonStructureCard;
