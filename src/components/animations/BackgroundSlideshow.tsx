
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number;
  className?: string;
}

const BackgroundSlideshow: React.FC<BackgroundSlideshowProps> = ({ 
  images, 
  interval = 5000, 
  className 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setTransitioning(false);
      }, 1000); // Durée de la transition
    }, interval);
    
    return () => clearInterval(timer);
  }, [images, interval, nextIndex]);

  if (images.length === 0) return null;
  
  if (images.length === 1) {
    return (
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full opacity-15 -z-10 bg-cover bg-center transition-all duration-1000", 
          className
        )}
        style={{ backgroundImage: `url(${images[0]})` }}
      />
    );
  }

  return (
    <>
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full opacity-15 -z-10 bg-cover bg-center transition-opacity duration-1000",
          transitioning ? "opacity-0" : "opacity-15",
          className
        )}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full opacity-15 -z-10 bg-cover bg-center transition-opacity duration-1000",
          transitioning ? "opacity-15" : "opacity-0",
          className
        )}
        style={{ backgroundImage: `url(${images[nextIndex]})` }}
      />
    </>
  );
};

export default BackgroundSlideshow;
