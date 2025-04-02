
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
  loop?: boolean;
  loopDelay?: number;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({
  endValue,
  startValue = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  formatNumber = true,
  loop = false,
  loopDelay = 5000
}) => {
  const [count, setCount] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(true);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
      previousTimeRef.current = time;
    }

    const elapsedTime = time - (startTimeRef.current || 0);
    const progress = Math.min(elapsedTime / duration, 1);
    
    const newCount = Math.floor(startValue + (endValue - startValue) * progress);
    
    setCount(newCount);

    previousTimeRef.current = time;

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      if (loop) {
        setTimeout(() => {
          startTimeRef.current = undefined;
          setIsAnimating(true);
          setCount(startValue);
          requestRef.current = requestAnimationFrame(animate);
        }, loopDelay);
      }
    }
  };

  useEffect(() => {
    if (isAnimating) {
      requestRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [endValue, startValue, duration, isAnimating, loop]);

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
