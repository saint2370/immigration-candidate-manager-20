
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
          blur && "backdrop-blur-[1px]",
          className
        )}
        style={{ 
          backgroundImage: `url(${images[0]})`,
          opacity: 0.85, // Augmenté pour une meilleure visibilité
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
          transitioning ? "opacity-0" : "opacity-85", // Augmenté pour une meilleure visibilité
          blur && "backdrop-blur-[1px]", // Réduit le flou pour mieux voir les détails des images
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
          transitioning ? "opacity-85" : "opacity-0", // Augmenté pour une meilleure visibilité
          blur && "backdrop-blur-[1px]", // Réduit le flou pour mieux voir les détails des images
          className
        )}
        style={{ 
          backgroundImage: `url(${images[nextIndex]})`,
          zIndex: -10
        }}
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-[-9]" /> {/* Réduit à 30% d'opacité pour moins d'assombrissement */}
    </>
  );
};

export default BackgroundSlideshow;
