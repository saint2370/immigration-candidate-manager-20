
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, 
  Globe, 
  Lock, 
  Bell, 
  CheckCircle
} from 'lucide-react';

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className={`${color} h-2`}></div>
      <div className="p-6">
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlatformAdvantages: React.FC = () => {
  const { language } = useLanguage();
  
  const platformAdvantages = [
    {
      title: language === 'fr' ? 'Accès sécurisé' : 'Secure access',
      description: language === 'fr' 
        ? 'Notre système de protection avancé garantit la confidentialité et la sécurité de vos données personnelles à tout moment. Vos informations sont cryptées et sécurisées selon les plus hauts standards.'
        : 'Our advanced protection system guarantees the confidentiality and security of your personal data at all times. Your information is encrypted and secured to the highest standards.',
      icon: <Lock size={32} className="text-red-600" />,
      color: "bg-red-600"
    },
    {
      title: language === 'fr' ? 'Informations officielles' : 'Official information',
      description: language === 'fr'
        ? 'Toutes nos informations proviennent directement des sources gouvernementales canadiennes, garantissant leur exactitude et leur fiabilité. Évitez les arnaques et les fausses informations.'
        : 'All our information comes directly from Canadian government sources, ensuring accuracy and reliability. Avoid scams and false information.',
      icon: <Globe size={32} className="text-blue-600" />,
      color: "bg-blue-600"
    },
    {
      title: language === 'fr' ? 'Suivi en temps réel' : 'Real-time tracking',
      description: language === 'fr'
        ? 'Suivez l\'évolution de votre dossier d\'immigration minute par minute. Notre système vous notifie immédiatement de tout changement ou mise à jour importante de votre statut.'
        : 'Track the progress of your immigration file minute by minute. Our system immediately notifies you of any changes or important updates to your status.',
      icon: <CheckCircle size={32} className="text-green-600" />,
      color: "bg-green-600"
    },
    {
      title: language === 'fr' ? 'Notifications instantanées' : 'Instant notifications',
      description: language === 'fr'
        ? 'Recevez des alertes personnalisées par email ou SMS concernant votre dossier. Ne manquez jamais une date importante ou un document requis pour votre processus d\'immigration.'
        : 'Receive customized alerts by email or SMS regarding your file. Never miss an important date or required document for your immigration process.',
      icon: <Bell size={32} className="text-amber-600" />,
      color: "bg-amber-600"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Les avantages de notre plateforme' : 'Our platform advantages'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Notre système unique est conçu pour vous offrir une expérience transparente et efficace tout au long de votre processus d\'immigration.'
              : 'Our unique system is designed to provide you with a transparent and efficient experience throughout your immigration process.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {platformAdvantages.map((advantage, index) => (
            <AdvantageCard 
              key={index}
              title={advantage.title}
              description={advantage.description}
              icon={advantage.icon}
              color={advantage.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformAdvantages;
