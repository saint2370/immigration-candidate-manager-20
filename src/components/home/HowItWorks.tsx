
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Bell, MessageSquare, UserCheck } from 'lucide-react';

const HowItWorks = () => {
  const { language } = useLanguage();
  
  const steps = [
    {
      icon: <UserCheck size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Identifiez-vous' : 'Identify Yourself',
      description: language === 'fr'
        ? 'Connectez-vous avec votre identifiant unique fourni par IRCC pour accéder à votre dossier.'
        : 'Log in with your unique identifier provided by IRCC to access your file.'
    },
    {
      icon: <FileText size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Consultez votre dossier' : 'View your file',
      description: language === 'fr'
        ? 'Accédez à toutes les informations de votre dossier d\'immigration, incluant les documents et le statut actuel.'
        : 'Access all information in your immigration file, including documents and current status.'
    },
    {
      icon: <Bell size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Suivez les mises à jour' : 'Follow updates',
      description: language === 'fr'
        ? 'Recevez des notifications en temps réel à chaque évolution importante de votre dossier.'
        : 'Receive real-time notifications for every important development in your file.'
    },
    {
      icon: <MessageSquare size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Obtenez de l\'assistance' : 'Get support',
      description: language === 'fr'
        ? 'Contactez-nous facilement pour toute question ou préoccupation concernant votre dossier.'
        : 'Contact us easily for any questions or concerns regarding your file.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Comment ça marche' : 'How It Works'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Notre plateforme simplifie le suivi de votre dossier d\'immigration en seulement quelques étapes faciles.'
              : 'Our platform simplifies tracking your immigration file in just a few easy steps.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center border-2 border-red-100">
                  {step.icon}
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-red-200" style={{ width: 'calc(100% - 5rem)' }}></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
