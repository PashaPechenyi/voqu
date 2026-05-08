import { Box, useMediaQuery } from '@mui/material';
import SectionCounterDecoration from '@/shared/components/SectionCounterDecoration/SectionCounterDecoration';
import { theme } from '@/theme';
import LessonStructureCard from './LessonStructureCard';
type LessonStructurePhaseProps = {
  phaseNumber: number;
  icon: any;
  title: string;
  description: string;
};
export type Style = {
  width: string | { xs: string; sm: string };
  textAlign: string;
  alignItems: string;
  order: number;
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
          cardStyles={{
            width: 'calc((100% - 100px) / 2)',
            textAlign: 'left',
            alignItems: 'start',
            order: 1,
          }}
        />
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <LessonStructureCard
          icon={icon}
          title={title}
          description={description}
          cardStyles={{
            width: 'calc((100% - 100px) / 2)',
            textAlign: 'right',
            alignItems: 'end',
            order: 3,
          }}
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
        cardStyles={{
          width: { xs: '100%', sm: '90%' },
          textAlign: 'left',
          alignItems: 'start',
          order: 1,
        }}
      />
    ) : (
      <LessonStructureCard
        icon={icon}
        title={title}
        description={description}
        cardStyles={{
          width: '100%',
          textAlign: 'left',
          alignItems: 'start',
          order: 1,
        }}
      />
    );
  }
}

export default LessonStructurePhase;
