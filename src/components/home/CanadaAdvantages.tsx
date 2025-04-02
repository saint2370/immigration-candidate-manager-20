
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, 
  Users, 
  DollarSign, 
  Clock, 
  Globe, 
  Lock, 
  Bell, 
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <CardContent className="p-6 flex flex-col items-center md:items-start md:flex-row gap-4">
        <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center shrink-0">
          <div className="text-white">{icon}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CanadaAdvantages: React.FC = () => {
  const { language } = useLanguage();
  
  const platformAdvantages = [
    {
      title: language === 'fr' ? 'Accès sécurisé' : 'Secure access',
      description: language === 'fr' 
        ? 'Accédez en toute sécurité à vos documents et informations personnelles avec notre système de protection avancé.'
        : 'Access your documents and personal information securely with our advanced protection system.',
      icon: <Lock size={28} />
    },
    {
      title: language === 'fr' ? 'Informations officielles' : 'Official information',
      description: language === 'fr'
        ? 'Recevez des informations fiables et vérifiées, évitant ainsi les arnaques et les fausses informations.'
        : 'Receive reliable and verified information, avoiding scams and false information.',
      icon: <Globe size={28} />
    },
    {
      title: language === 'fr' ? 'Suivi en temps réel' : 'Real-time tracking',
      description: language === 'fr'
        ? 'Suivez l\'évolution de votre dossier d\'immigration à tout moment et soyez informé des mises à jour importantes.'
        : 'Track the progress of your immigration file at any time and be informed of important updates.',
      icon: <CheckCircle size={28} />
    },
    {
      title: language === 'fr' ? 'Notifications instantanées' : 'Instant notifications',
      description: language === 'fr'
        ? 'Recevez des alertes et notifications en temps réel concernant les changements de statut et les étapes à suivre.'
        : 'Receive real-time alerts and notifications about status changes and next steps.',
      icon: <Bell size={28} />
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Avantages de notre plateforme' : 'Our platform advantages'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Notre plateforme vous offre de nombreux avantages pour faciliter votre processus d\'immigration.'
              : 'Our platform offers you many advantages to facilitate your immigration process.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {platformAdvantages.map((advantage, index) => (
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
