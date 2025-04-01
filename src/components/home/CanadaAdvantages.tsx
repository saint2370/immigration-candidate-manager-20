
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase, Heart, Shield, Users, DollarSign } from 'lucide-react';

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const CanadaAdvantages: React.FC = () => {
  const { language } = useLanguage();
  
  const advantages = [
    {
      title: language === 'fr' ? 'Salaire compétitif' : 'Competitive salary',
      description: language === 'fr' 
        ? 'Profitez d\'une rémunération attractive et d\'une stabilité financière grâce à l\'économie canadienne robuste.'
        : 'Enjoy attractive compensation and financial stability thanks to Canada\'s robust economy.',
      icon: <DollarSign size={28} />
    },
    {
      title: language === 'fr' ? 'Qualité de vie' : 'Quality of life',
      description: language === 'fr'
        ? 'Bénéficiez d\'une excellente qualité de vie avec des infrastructures modernes dans un environnement sûr et agréable.'
        : 'Benefit from an excellent quality of life with modern infrastructure in a safe and pleasant environment.',
      icon: <Shield size={28} />
    },
    {
      title: language === 'fr' ? 'Soins de santé' : 'Healthcare',
      description: language === 'fr'
        ? 'Accédez à des soins de santé universels et de qualité pour vous et votre famille.'
        : 'Access universal, quality healthcare for you and your family.',
      icon: <Heart size={28} />
    },
    {
      title: language === 'fr' ? 'Opportunités d\'emploi' : 'Job opportunities',
      description: language === 'fr'
        ? 'Découvrez un marché du travail dynamique offrant de nombreuses opportunités dans divers secteurs.'
        : 'Discover a dynamic job market offering numerous opportunities in various sectors.',
      icon: <Briefcase size={28} />
    },
    {
      title: language === 'fr' ? 'Culture diversifiée' : 'Diverse culture',
      description: language === 'fr'
        ? 'Rejoignez une société multiculturelle et inclusive qui célèbre la diversité et accueille les immigrants.'
        : 'Join a multicultural and inclusive society that celebrates diversity and welcomes immigrants.',
      icon: <Users size={28} />
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
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
        
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard 
              key={index}
              title={advantage.title}
              description={advantage.description}
              icon={advantage.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CanadaAdvantages;
