import { useId } from 'react';
import { SvgIcon, SvgIconProps, Typography, Box } from '@mui/material';
//import useResolveColor from '../../hooks/useResolveColor';
import { TSxProps, TMuiColors } from '@/theme/types';
import { combineSxStyles } from '@/theme/helpers';
import useResolveColor from '@/hooks/useResolveColor';
import AnimatedNumber from './AnimatedNumber';

/**
 * Props for the ProgressCircle component
 * @property percentage - Fill percentage of the circle (0-100)
 * @property diameter - Circle diameter in pixels
 * @property borderWidth - Progress line thickness in pixels
 * @property progressColor - Progress arc color (MUI color name or CSS color value)
 * @property ringColor - Background ring color (MUI color name or CSS color value)
 * @property animate - Whether to animate the progress circle
 * @property animationDuration - Animation duration in seconds
 * @property sx - Additional styles to apply to the component
 */
type ProgressCircleIconProps = SvgIconProps & {
  percentage: number;
  diameter?: number;
  borderWidth?: number;
  progressColor?: TMuiColors | string;
  ringColor?: TMuiColors | string;
  animate?: boolean;
  animationDuration?: number;
  sx?: TSxProps;
};

const ProgressCircleIcon = ({
  percentage,
  diameter = 24,
  borderWidth = 1,
  progressColor = 'secondary',
  ringColor = 'tertiary',
  animate = true,
  animationDuration = 2,
  sx,
  ...props
}: ProgressCircleIconProps) => {
  const { resolveColorFromPalette } = useResolveColor();

  const id = useId();
  const resolvedProgressColor = resolveColorFromPalette(progressColor);
  const resolvedRingColor = resolveColorFromPalette(ringColor);

  //     const resolvedProgressColor = 'green';
  //   const resolvedRingColor = "#eee";
  const animationName = `progressCircle-${id.replace(/:/g, '')}`;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = (diameter - borderWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedPercentage / 100) * circumference;
  const fullOffset = circumference; // Initial state (0%)

  return (
    <>
      <style>{`
        @keyframes ${animationName} {
          from {
            stroke-dashoffset: ${fullOffset};
          }
          to {
            stroke-dashoffset: ${offset};
          }
        }
      `}</style>

      <SvgIcon
        viewBox={`0 0 ${diameter} ${diameter}`}
        sx={combineSxStyles({ height: 'auto', position: 'relative' }, sx)}
        {...props}
      >
        {/* Background ring */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={resolvedRingColor}
          strokeWidth={borderWidth}
        />

        {/* Progress arc */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={resolvedProgressColor}
          strokeWidth={borderWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
          style={{
            animation: animate
              ? `${animationName} ${animationDuration}s ease-out forwards`
              : 'none',
            strokeDashoffset: animate ? fullOffset : offset,
          }}
        />
        {/* <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="4">
          <AnimatedNumber percent={percentage}/>%
        </text> */}
         <AnimatedNumber percent={percentage}/>
      </SvgIcon>
    </>
  );
};

export default ProgressCircleIcon;
