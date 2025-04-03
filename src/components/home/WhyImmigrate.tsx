
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface AdvantageItemProps {
  title: string;
  description: string;
  bgImage: string;
  className?: string;
}

const AdvantageItem: React.FC<AdvantageItemProps> = ({ title, description, bgImage, className }) => {
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden h-56 md:h-64 transition-all duration-300 hover:shadow-lg", 
        className
      )}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[1px] flex flex-col justify-end p-5">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

const WhyImmigrate: React.FC = () => {
  const { language } = useLanguage();
  
  const advantages = [
    {
      title: language === 'fr' ? 'Qualité de vie exceptionnelle' : 'Exceptional quality of life',
      description: language === 'fr' 
        ? 'Le Canada offre l\'un des meilleurs systèmes de santé universels, une éducation de qualité mondiale et un environnement sécuritaire pour les familles.'
        : 'Canada offers one of the best universal healthcare systems, world-class education and a safe environment for families.',
      image: '/lovable-uploads/0ecd56d9-ac2f-4dfd-953c-751381164189.png'
    },
    {
      title: language === 'fr' ? 'Une économie dynamique' : 'A dynamic economy',
      description: language === 'fr'
        ? 'Avec un marché du travail florissant et des opportunités dans de nombreux secteurs, le Canada continue d\'attirer des talents du monde entier.'
        : 'With a thriving job market and opportunities in many sectors, Canada continues to attract talent from around the world.',
      image: '/lovable-uploads/b6719299-9011-4648-9c54-88eb56f3bf2b.png'
    },
    {
      title: language === 'fr' ? 'Diversité et inclusion' : 'Diversity and inclusion',
      description: language === 'fr'
        ? 'Le multiculturalisme est au cœur de l\'identité canadienne. Chacun est bienvenu et respecté, quelle que soit son origine ou sa culture.'
        : 'Multiculturalism is at the heart of Canadian identity. Everyone is welcome and respected, regardless of their origin or culture.',
      image: '/lovable-uploads/3f408027-7f4c-4b71-b735-880bee6a8fc1.png'
    },
    {
      title: language === 'fr' ? 'Environnement naturel préservé' : 'Preserved natural environment',
      description: language === 'fr'
        ? 'Des montagnes majestueuses aux lacs cristallins, le Canada possède des paysages à couper le souffle et une nature préservée incomparable.'
        : 'From majestic mountains to crystal-clear lakes, Canada has breathtaking landscapes and unparalleled preserved nature.',
      image: '/lovable-uploads/2e4a0ceb-7358-49e3-8a50-e0e6b9a1b419.png'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Pourquoi immigrer au Canada ?' : 'Why immigrate to Canada?'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez les raisons qui font du Canada l\'une des destinations les plus prisées pour l\'immigration.'
              : 'Discover the reasons why Canada is one of the most sought-after destinations for immigration.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageItem 
              key={index}
              title={advantage.title}
              description={advantage.description}
              bgImage={advantage.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyImmigrate;
