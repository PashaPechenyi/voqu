import { FC } from 'react';
import { keyframes, SvgIcon, SvgIconProps } from '@mui/material';
import { SxStyleProps, MuiColor } from '@/shared/types/sx.type';
import { combineSxStyles } from '@/shared/helpers/styles/combineSxStyles.helper';
import { useResolveColor } from '@/shared/hooks/useResolveColor';

type ProgressCircleIconProps = SvgIconProps & {
  percentage: number;
  diameter?: number;
  borderWidth?: number;
  progressColor?: MuiColor | string;
  ringColor?: MuiColor | string;
  animate?: boolean;
  animationDuration?: number;
  sx?: SxStyleProps;
};

const ProgressCircleIcon: FC<ProgressCircleIconProps> = ({
  percentage,
  diameter = 24,
  borderWidth = 1,
  progressColor = 'secondary',
  ringColor = 'tertiary',
  animate = true,
  animationDuration = 2,
  sx,
  ...props
}) => {
  const { resolveColorFromPalette } = useResolveColor();

  const resolvedProgressColor = resolveColorFromPalette(progressColor);
  const resolvedRingColor = resolveColorFromPalette(ringColor);

  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = (diameter - borderWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedPercentage / 100) * circumference;
  const fullOffset = circumference;

  const fillKeyframes = keyframes`
    from { stroke-dashoffset: ${fullOffset}; }
    to { stroke-dashoffset: ${offset}; }
  `;

  return (
    <SvgIcon
      viewBox={`0 0 ${diameter} ${diameter}`}
      sx={combineSxStyles(
        {
          height: 'auto',
          position: 'relative',
          // The keyframes rule must be injected by emotion via `sx`; a plain
          // inline `style` would reference an @keyframes that was never inserted,
          // so the animation would silently not run.
          '& .ProgressCircleIcon-progress': {
            strokeDashoffset: offset,
            ...(animate && {
              animation: `${fillKeyframes} ${animationDuration}s ease-out forwards`,
            }),
          },
        },
        sx,
      )}
      {...props}
    >
      <circle
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        fill="none"
        stroke={resolvedRingColor}
        strokeWidth={borderWidth}
      />
      <circle
        className="ProgressCircleIcon-progress"
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        fill="none"
        stroke={resolvedProgressColor}
        strokeWidth={borderWidth}
        strokeDasharray={circumference}
        strokeLinecap="round"
        transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
      />
    </SvgIcon>
  );
};

export default ProgressCircleIcon;
