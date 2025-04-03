
import React from 'react';
import { cn } from '@/lib/utils';

interface StaticBackgroundProps {
  image: string;
  className?: string;
  blur?: boolean;
}

const StaticBackground: React.FC<StaticBackgroundProps> = ({ 
  image, 
  className,
  blur = false
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
          opacity: 0.85,
          zIndex: -10
        }}
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-[-9]" />
    </>
  );
};

export default StaticBackground;
