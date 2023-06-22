import { calculateRemainingTime, formatTime } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  endTime: Date;
}

const Timer: React.FC<TimerProps> = ({ endTime }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRemainingTime(calculateRemainingTime(endTime, intervalRef));

    intervalRef.current = setInterval(() => {
      setRemainingTime(calculateRemainingTime(endTime, intervalRef));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endTime]);

  return <div>{formatTime(remainingTime)}</div>;
};

export default Timer;
