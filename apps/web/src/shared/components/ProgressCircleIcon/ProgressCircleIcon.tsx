import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
// import { keyframes } from '@mui/system';
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

  // TODO: the fill animation was commented out on this branch, disabling the `animate`/`animationDuration`
  // props. Decide whether to restore the keyframes animation or drop the props entirely (behavioral change — left as-is).
  // const fillKeyframes = keyframes`
  //   from { stroke-dashoffset: ${fullOffset}; }
  //   to { stroke-dashoffset: ${offset}; }
  // `;

  return (
    <SvgIcon
      viewBox={`0 0 ${diameter} ${diameter}`}
      sx={combineSxStyles({ height: 'auto', position: 'relative' }, sx)}
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
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        fill="none"
        stroke={resolvedProgressColor}
        strokeWidth={borderWidth}
        strokeDasharray={circumference}
        strokeLinecap="round"
        transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
        // style={{
        //   animation: animate
        //     ? `${fillKeyframes} ${animationDuration}s ease-out forwards`
        //     : 'none',
        //   strokeDashoffset: animate ? fullOffset : offset,
        // }}
      />
    </SvgIcon>
  );
};

export default ProgressCircleIcon;
