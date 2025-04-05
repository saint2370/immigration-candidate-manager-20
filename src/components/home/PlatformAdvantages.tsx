
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileLock, Clock, BarChart2, CalendarCheck, Shield, Database } from 'lucide-react';

const PlatformAdvantages = () => {
  const { language } = useLanguage();
  
  const advantages = [
    {
      icon: <FileLock size={40} className="text-red-600" />,
      title: language === 'fr' ? 'Accès sécurisé' : 'Secure Access',
      description: language === 'fr' 
        ? 'Consultez votre dossier d\'immigration en toute sécurité grâce à notre système de protection des données de pointe.'
        : 'Access your immigration file securely thanks to our cutting-edge data protection system.'
    },
    {
      icon: <Database size={40} className="text-red-600" />,
      title: language === 'fr' ? 'Informations officielles' : 'Official Information',
      description: language === 'fr'
        ? 'Toutes les informations sur notre plateforme sont vérifiées et proviennent directement des sources gouvernementales.'
        : 'All information on our platform is verified and comes directly from government sources.'
    },
    {
      icon: <Clock size={40} className="text-red-600" />,
      title: language === 'fr' ? 'Suivi en temps réel' : 'Real-time Tracking',
      description: language === 'fr'
        ? 'Suivez l\'évolution de votre dossier en temps réel et recevez des notifications à chaque étape importante.'
        : 'Track the progress of your file in real time and receive notifications at each important stage.'
    },
    {
      icon: <CalendarCheck size={40} className="text-red-600" />,
      title: language === 'fr' ? 'Rappels automatiques' : 'Automatic Reminders',
      description: language === 'fr'
        ? 'Recevez des rappels pour vos rendez-vous, les documents à fournir ou les délais importants à respecter.'
        : 'Receive reminders for your appointments, documents to provide, or important deadlines to respect.'
    },
    {
      icon: <Shield size={40} className="text-red-600" />,
      title: language === 'fr' ? 'Protection des données' : 'Data Protection',
      description: language === 'fr'
        ? 'Vos informations personnelles sont protégées selon les normes les plus strictes de sécurité et de confidentialité.'
        : 'Your personal information is protected according to the strictest standards of security and confidentiality.'
    },
    {
      icon: <BarChart2 size={40} className="text-red-600" />,
      title: language === 'fr' ? 'Statistiques officielles' : 'Official Statistics',
      description: language === 'fr'
        ? 'Accédez aux dernières statistiques d\'immigration pour mieux comprendre les tendances et les délais moyens.'
        : 'Access the latest immigration statistics to better understand trends and average processing times.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Les avantages de notre plateforme' : 'Platform Advantages'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Notre plateforme digitale offre de nombreux avantages pour rendre le suivi de votre dossier d\'immigration plus simple et transparent.'
              : 'Our digital platform offers many advantages to make tracking your immigration file simpler and more transparent.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="bg-red-50 p-4 rounded-full mb-4">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformAdvantages;
