
import React from 'react';
import { cn } from '@/lib/utils';

interface StaticBackgroundProps {
  image: string;
  className?: string;
  blur?: boolean;
  opacity?: number;
}

const StaticBackground: React.FC<StaticBackgroundProps> = ({ 
  image, 
  className,
  blur = false,
  opacity = 0.85
}) => {
  return (
    <>
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-cover bg-center",
          blur && "backdrop-blur-[1px]",
          className
        )}
        style={{ 
          backgroundImage: `url(${image})`,
          opacity: opacity,
          zIndex: -10
        }}
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-[-9]" />
    </>
  );
};

export default StaticBackground;
