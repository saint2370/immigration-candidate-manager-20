
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
        ? 'Le Canada est régulièrement classé parmi les pays offrant la meilleure qualité de vie au monde. Ses villes propres, sûres et accueillantes offrent un environnement idéal pour s\'épanouir et élever une famille. Le pays se distingue par un faible taux de criminalité, une excellente qualité de l\'air et de l\'eau, ainsi qu\'un système social développé.'
        : 'Canada is consistently ranked among the countries with the best quality of life in the world. Its clean, safe, and welcoming cities offer an ideal environment to thrive and raise a family. The country stands out for its low crime rate, excellent air and water quality, as well as a developed social system.',
      image: '/lovable-uploads/ex1.png'
    },
    {
      title: language === 'fr' ? 'Système de santé de classe mondiale' : 'World-class healthcare system',
      description: language === 'fr'
        ? 'Bénéficiez d\'un système de santé public et universel, financé par les impôts et accessible à tous les résidents permanents et citoyens. Les services médicaux essentiels sont couverts, garantissant des soins de qualité sans frais directs. Chaque province gère son propre système de santé, offrant une couverture complète et équitable pour tous.'
        : 'Benefit from a public and universal healthcare system, funded by taxes and accessible to all permanent residents and citizens. Essential medical services are covered, ensuring quality care without direct costs. Each province manages its own healthcare system, offering comprehensive and equitable coverage for all.',
      image: '/lovable-uploads/ex2.png'
    },
    {
      title: language === 'fr' ? 'Opportunités d\'emploi abondantes' : 'Abundant job opportunities',
      description: language === 'fr'
        ? 'Découvrez un marché du travail dynamique avec des opportunités dans de nombreux secteurs. Le Canada fait face à une pénurie de main-d\'œuvre qualifiée dans plusieurs domaines comme la santé, l\'ingénierie, les technologies de l\'information et la construction. Des programmes spécifiques facilitent l\'intégration des immigrants dans le monde du travail canadien.'
        : 'Discover a dynamic job market with opportunities in many sectors. Canada faces a shortage of skilled labor in several fields such as healthcare, engineering, information technology, and construction. Specific programs facilitate the integration of immigrants into the Canadian workforce.',
      image: '/lovable-uploads/ex3.png'
    },
    {
      title: language === 'fr' ? 'Culture diversifiée et inclusive' : 'Diverse and inclusive culture',
      description: language === 'fr'
        ? 'Le Canada est reconnu pour son multiculturalisme et son respect des différentes cultures, religions et modes de vie. Cette diversité culturelle est célébrée à travers de nombreux festivals et événements tout au long de l\'année. Les politiques canadiennes encouragent activement l\'inclusion et la tolérance, créant une société où chacun peut s\'exprimer librement.'
        : 'Canada is known for its multiculturalism and respect for different cultures, religions, and ways of life. This cultural diversity is celebrated through numerous festivals and events throughout the year. Canadian policies actively encourage inclusion and tolerance, creating a society where everyone can express themselves freely.',
      image: '/lovable-uploads/ex4.png'
    },
    {
      title: language === 'fr' ? 'Nature exceptionnelle' : 'Exceptional nature',
      description: language === 'fr'
        ? 'Profitez de paysages à couper le souffle, des montagnes majestueuses aux lacs cristallins. Le Canada possède 48 parcs nationaux et réserves préservant la biodiversité et offrant des espaces naturels immenses pour les activités en plein air. Explorez des forêts denses, des plaines infinies, des glaciers impressionnants et des côtes spectaculaires à travers les quatre saisons distinctes.'
        : 'Enjoy breathtaking landscapes, from majestic mountains to crystal-clear lakes. Canada has 48 national parks and reserves preserving biodiversity and offering vast natural spaces for outdoor activities. Explore dense forests, endless plains, impressive glaciers, and spectacular coastlines through the four distinct seasons.',
      image: '/lovable-uploads/ex5.png'
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
