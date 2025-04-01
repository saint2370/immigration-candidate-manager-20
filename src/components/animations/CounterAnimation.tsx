
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CounterAnimationProps {
  endValue: number;
  startValue?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatNumber?: boolean;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({
  endValue,
  startValue = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  formatNumber = true
}) => {
  const [count, setCount] = useState(startValue);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    startTimeRef.current = undefined; // Réinitialiser à chaque changement de endValue
    
    const animate = (time: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = time;
        previousTimeRef.current = time;
      }

      const elapsedTime = time - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const newCount = Math.floor(startValue + (endValue - startValue) * progress);
      
      setCount(newCount);

      previousTimeRef.current = time;

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [endValue, startValue, duration]);

  const formatCountNumber = (num: number): string => {
    if (!formatNumber) return num.toString();
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className={cn("font-bold text-center", className)}>
      {prefix}{formatCountNumber(count)}{suffix}
    </div>
  );
};

export default CounterAnimation;
