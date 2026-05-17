import { FC } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import SectionCounterDecoration from '@/shared/components/SectionCounterDecoration/SectionCounterDecoration';
import LessonStructureCard from './LessonStructureCard';
import { LessonCardStyle } from '../types/lessonCardStyle.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LessonStructurePhaseProps = {
  phaseNumber: number;
  icon: SvgIconComponent;
  title: string;
  description: string;
};

const buildCardStyles = (isMobile: boolean, phaseNumber: number): LessonCardStyle => {
  if (isMobile) {
    return {
      width: phaseNumber % 2 ? { xs: '100%', sm: '90%' } : '100%',
      textAlign: 'left',
      alignItems: 'start',
      order: 1,
    };
  }
  return phaseNumber % 2
    ? {
        width: 'calc((100% - 100px) / 2)',
        textAlign: 'left',
        alignItems: 'start',
        order: 1,
      }
    : {
        width: 'calc((100% - 100px) / 2)',
        textAlign: 'right',
        alignItems: 'end',
        order: 3,
      };
};

const LessonStructurePhase: FC<LessonStructurePhaseProps> = ({
  icon,
  title,
  description,
  phaseNumber,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cardStyles = buildCardStyles(isMobile, phaseNumber);

  if (isMobile) {
    return (
      <LessonStructureCard
        icon={icon}
        title={title}
        description={description}
        cardStyles={cardStyles}
      />
    );
  }

  const isOdd = phaseNumber % 2 === 1;
  return (
    <Box sx={isOdd ? sxStyles.rowEnd : sxStyles.rowStart}>
      {isOdd && <SectionCounterDecoration index={phaseNumber} />}
      <LessonStructureCard
        icon={icon}
        title={title}
        description={description}
        cardStyles={cardStyles}
      />
      {!isOdd && <SectionCounterDecoration index={phaseNumber} />}
    </Box>
  );
};

const sxStyles = createSxStylesList({
  rowEnd: { display: 'flex', justifyContent: 'flex-end', width: '100%' },
  rowStart: { display: 'flex', justifyContent: 'flex-start', width: '100%' },
});

export default LessonStructurePhase;
