
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Fingerprint, FileSearch, Bell, MessageSquare } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-all duration-300 border-t-4 border-red-600">
      <div className="absolute -top-5 left-6 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
        {number}
      </div>
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="mb-4 text-red-600">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { t, language } = useLanguage();
  
  const steps = [
    {
      number: 1,
      title: t('enter_id'),
      description: t('enter_id_desc'),
      icon: <Fingerprint size={40} />
    },
    {
      number: 2,
      title: t('view_file'),
      description: t('view_file_desc'),
      icon: <FileSearch size={40} />
    },
    {
      number: 3,
      title: t('follow_updates'),
      description: t('follow_updates_desc'),
      icon: <Bell size={40} />
    },
    {
      number: 4,
      title: language === 'fr' ? 'Lire les témoignages' : 'Read testimonials',
      description: language === 'fr' 
        ? 'Découvrez les expériences d\'autres personnes qui ont utilisé notre plateforme pour leur processus d\'immigration.' 
        : 'Discover the experiences of other people who have used our platform for their immigration process.',
      icon: <MessageSquare size={40} />
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{t('how_it_works')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('how_it_works_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {steps.map((step) => (
            <Step 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
