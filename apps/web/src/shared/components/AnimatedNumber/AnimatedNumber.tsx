import { useEffect, useRef, useState } from 'react';
type AnimatedNumberType = {
  percent: number;
};
//let animatedPercent=0;
const animationDuration = 2000;
function AnimatedNumber({ percent }: AnimatedNumberType) {
  const [animatedPercent, setAnimatedPercent] = useState<number>(0);
  const intervalId = useRef<number | null>(null);
  const step = percent / (animationDuration / 10);

  function resolveNumberDisplayFormat(value: number) {
    return Number(value.toFixed(2));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPercent((prev) => prev + step);
    }, 10);
    intervalId.current = interval;
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (resolveNumberDisplayFormat(animatedPercent) >= percent && intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, [animatedPercent]);

  // FIXME: this component need to be more abstract so we should not use test html tag here. USe React Fragment
  return (
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="4">
      {resolveNumberDisplayFormat(animatedPercent)}%
    </text>
  );
}

export default AnimatedNumber;
