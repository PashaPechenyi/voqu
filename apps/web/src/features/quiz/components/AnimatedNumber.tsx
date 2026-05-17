import { FC, useEffect, useRef, useState } from 'react';

type AnimatedNumberProps = {
  percent: number;
};

const ANIMATION_DURATION_MS = 2000;
const TICK_MS = 10;

const formatNumber = (value: number): number => Number(value.toFixed(2));

const AnimatedNumber: FC<AnimatedNumberProps> = ({ percent }) => {
  const [animatedPercent, setAnimatedPercent] = useState<number>(0);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    const step = percent / (ANIMATION_DURATION_MS / TICK_MS);
    setAnimatedPercent(0);
    const interval = window.setInterval(() => {
      setAnimatedPercent((prev) => prev + step);
    }, TICK_MS);
    intervalId.current = interval;
    return () => {
      window.clearInterval(interval);
    };
  }, [percent]);

  useEffect(() => {
    if (formatNumber(animatedPercent) >= percent && intervalId.current) {
      window.clearInterval(intervalId.current);
    }
  }, [animatedPercent, percent]);

  return (
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="4">
      {formatNumber(animatedPercent)}%
    </text>
  );
};

export default AnimatedNumber;
