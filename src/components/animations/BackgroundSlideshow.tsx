
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number;
  className?: string;
  blur?: boolean;
}

const BackgroundSlideshow: React.FC<BackgroundSlideshowProps> = ({ 
  images, 
  interval = 7000, 
  className,
  blur = false
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
        // Générer un index aléatoire différent du courant
        let newNextIndex;
        do {
          newNextIndex = Math.floor(Math.random() * images.length);
        } while (newNextIndex === nextIndex && images.length > 1);
        
        setNextIndex(newNextIndex);
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
          "fixed top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000", 
          blur && "backdrop-blur-sm",
          className
        )}
        style={{ 
          backgroundImage: `url(${images[0]})`,
          opacity: 0.15,
          zIndex: -10
        }}
      />
    );
  }

  return (
    <>
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000",
          transitioning ? "opacity-0" : "opacity-15",
          blur && "backdrop-filter backdrop-blur-sm",
          className
        )}
        style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          zIndex: -10
        }}
      />
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000",
          transitioning ? "opacity-15" : "opacity-0",
          blur && "backdrop-filter backdrop-blur-sm",
          className
        )}
        style={{ 
          backgroundImage: `url(${images[nextIndex]})`,
          zIndex: -10
        }}
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-75 z-[-9]" />
    </>
  );
};

export default BackgroundSlideshow;
