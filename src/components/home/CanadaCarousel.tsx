
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  title: string;
  description: string;
  image: string;
}

const CanadaCarousel: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();
  
  const carouselItems: CarouselItem[] = [
    {
      title: language === 'fr' ? 'Qualité de vie exceptionnelle' : 'Exceptional quality of life',
      description: language === 'fr' 
        ? 'Le Canada est régulièrement classé parmi les pays offrant la meilleure qualité de vie au monde, avec des villes propres, sûres et accueillantes.'
        : 'Canada is consistently ranked among the countries with the best quality of life in the world, with clean, safe, and welcoming cities.',
      image: '/lovable-uploads/2f8168f1-37e3-4677-85cc-468195478835.png'
    },
    {
      title: language === 'fr' ? 'Système de santé de classe mondiale' : 'World-class healthcare system',
      description: language === 'fr'
        ? 'Bénéficiez d\'un système de santé public et universel, financé par les impôts et accessible à tous les résidents permanents et citoyens.'
        : 'Benefit from a public and universal healthcare system, funded by taxes and accessible to all permanent residents and citizens.',
      image: '/lovable-uploads/66eb6a03-8ac0-4497-be31-9da25750487f.png'
    },
    {
      title: language === 'fr' ? 'Opportunités d\'emploi abondantes' : 'Abundant job opportunities',
      description: language === 'fr'
        ? 'Découvrez un marché du travail dynamique avec des opportunités dans de nombreux secteurs et des programmes spécifiques pour les immigrants.'
        : 'Discover a dynamic job market with opportunities in many sectors and specific programs for immigrants.',
      image: '/lovable-uploads/00bef2f0-7b5c-4e04-b53a-d41885957983.png'
    },
    {
      title: language === 'fr' ? 'Culture diversifiée et inclusive' : 'Diverse and inclusive culture',
      description: language === 'fr'
        ? 'Le Canada est reconnu pour son multiculturalisme et son respect des différentes cultures, religions et modes de vie.'
        : 'Canada is known for its multiculturalism and respect for different cultures, religions, and ways of life.',
      image: '/lovable-uploads/02cfee17-830e-4af9-a983-dea86ca2cc2a.png'
    },
    {
      title: language === 'fr' ? 'Nature exceptionnelle' : 'Exceptional nature',
      description: language === 'fr'
        ? 'Profitez de paysages à couper le souffle, des montagnes majestueuses aux lacs cristallins, et d\'une multitude d\'activités de plein air tout au long de l\'année.'
        : 'Enjoy breathtaking landscapes, from majestic mountains to crystal-clear lakes, and a multitude of outdoor activities throughout the year.',
      image: '/lovable-uploads/173c1e3b-c129-4e78-850e-618cc040e16e.png'
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((current) => (current === carouselItems.length - 1 ? 0 : current + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((current) => (current === 0 ? carouselItems.length - 1 : current - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-advance timer
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isTransitioning]);

  return (
    <section className="py-12 bg-white bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Pourquoi immigrer au Canada ?' : 'Why immigrate to Canada?'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Le Canada offre une qualité de vie exceptionnelle et de nombreuses opportunités pour les nouveaux arrivants.'
              : 'Canada offers an exceptional quality of life and numerous opportunities for newcomers.'}
          </p>
        </div>
        
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 items-center`}>
          {/* Left side: Text content */}
          <div className={`${isMobile ? 'w-full' : 'w-1/2'} space-y-4 relative min-h-[250px] md:min-h-[300px] flex flex-col justify-center`}>
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                } flex flex-col justify-center`}
              >
                <h3 className="text-2xl font-bold text-red-600 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-lg">{item.description}</p>
              </div>
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pt-8">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsTransitioning(true);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? "bg-red-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Right side: Image */}
          <div className={`${isMobile ? 'w-full' : 'w-1/2'} relative rounded-lg overflow-hidden shadow-lg h-[250px] md:h-[400px]`}>
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white bg-opacity-50 hover:bg-opacity-80"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white bg-opacity-50 hover:bg-opacity-80"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CanadaCarousel;
