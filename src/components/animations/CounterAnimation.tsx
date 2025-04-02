
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
  randomize?: boolean;
  minValue?: number;
  maxValue?: number;
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
  loopDelay = 5000,
  randomize = false,
  minValue = 500,
  maxValue = 50000
}) => {
  const [count, setCount] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentEndValue, setCurrentEndValue] = useState(endValue);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Generate a random end value if randomize is true
  useEffect(() => {
    if (randomize) {
      const randomEndValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      setCurrentEndValue(randomEndValue);
    } else {
      setCurrentEndValue(endValue);
    }
  }, [randomize, endValue, minValue, maxValue]);

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
      previousTimeRef.current = time;
    }

    const elapsedTime = time - (startTimeRef.current || 0);
    const progress = Math.min(elapsedTime / duration, 1);
    
    // Utiliser une fonction d'easing pour un effet plus naturel
    const easedProgress = easeOutQuad(progress);
    const newCount = Math.floor(startValue + (currentEndValue - startValue) * easedProgress);
    
    setCount(newCount);

    previousTimeRef.current = time;

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setCount(currentEndValue); // Assurez-vous que la valeur finale est exactement la valeur de fin
      setIsAnimating(false);
      if (loop) {
        setTimeout(() => {
          startTimeRef.current = undefined;
          setIsAnimating(true);
          setCount(startValue);
          
          // Generate new random value if randomize is enabled
          if (randomize) {
            const newRandomEndValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            setCurrentEndValue(newRandomEndValue);
          }
          
          requestRef.current = requestAnimationFrame(animate);
        }, loopDelay);
      }
    }
  };

  // Fonction d'easing quadratique pour une animation plus douce
  const easeOutQuad = (x: number): number => {
    return 1 - (1 - x) * (1 - x);
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
  }, [isAnimating, currentEndValue, startValue, duration, loop]);

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
