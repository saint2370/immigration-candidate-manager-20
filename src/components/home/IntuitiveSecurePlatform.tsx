
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Lock, UserCheck } from 'lucide-react';

const IntuitiveSecurePlatform: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: <Clock className="text-white" size={32} />,
      title: t('quick_consultation'),
      description: t('quick_consultation_desc'),
      bgColor: 'from-red-500 to-red-600',
      hoverEffect: 'hover:-translate-y-1 hover:shadow-lg'
    },
    {
      icon: <Lock className="text-white" size={32} />,
      title: t('secure_access'),
      description: t('secure_access_desc'),
      bgColor: 'from-red-600 to-red-700',
      hoverEffect: 'hover:-translate-y-1 hover:shadow-lg'
    },
    {
      icon: <UserCheck className="text-white" size={32} />,
      title: t('personalized_tracking'),
      description: t('personalized_tracking_desc'),
      bgColor: 'from-red-700 to-red-800',
      hoverEffect: 'hover:-translate-y-1 hover:shadow-lg'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {language === 'fr' ? 'Une plateforme intuitive et sécurisée' : 'An intuitive and secure platform'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Notre interface moderne vous offre un suivi complet et transparent de votre demande d\'immigration.'
              : 'Our modern interface offers you complete and transparent monitoring of your immigration application.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`rounded-lg shadow-md text-center overflow-hidden transition-all duration-300 ${feature.hoverEffect}`}
            >
              <div className={`bg-gradient-to-br ${feature.bgColor} p-6`}>
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntuitiveSecurePlatform;
