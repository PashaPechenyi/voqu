import { Height } from '@mui/icons-material';
import { Box, Typography, useMediaQuery } from '@mui/material';
import SectionCounterDecoration from './SectionCounterDecoration';
import { theme } from '@/theme';
import LessonStructureCard from './LessonStructureCard';
type LessonStructurePhaseProps = {
  phaseNumber: number;
  icon: any;
  title: string;
  description: string;
};
function LessonStructurePhase({
  icon,
  title,
  description,
  phaseNumber,
}: LessonStructurePhaseProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  if (!isMobile) {
    return phaseNumber % 2 ? (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <SectionCounterDecoration ind={phaseNumber} />
        <LessonStructureCard
          icon={icon}
          title={title}
          description={description}
          textAling="left"
          alingItems="start"
          order={1}
          width={'calc((100% - 100px) / 2)'}
        />
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <LessonStructureCard
          icon={icon}
          title={title}
          description={description}
          textAling="right"
          alingItems="end"
          order={3}
          width={'calc((100% - 100px) / 2)'}
        />

        <SectionCounterDecoration ind={phaseNumber} />
      </Box>
    );
  } else {
    return phaseNumber % 2 ? (
      <LessonStructureCard
        icon={icon}
        title={title}
        description={description}
        textAling="left"
        alingItems="start"
        order={1}
        width={{ xs: '100%', sm: '90%' }}
      />
    ) : (
      <LessonStructureCard
        icon={icon}
        title={title}
        description={description}
        textAling="left"
        alingItems="start"
        order={1}
        width="100%"
      />
    );
  }
}

export default LessonStructurePhase;
