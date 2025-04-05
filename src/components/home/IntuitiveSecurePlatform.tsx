
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LockKeyhole, Search, Bell, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IntuitiveSecurePlatform = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: <LockKeyhole size={24} className="text-red-600" />,
      title: language === 'fr' ? 'Sécurité renforcée' : 'Enhanced Security',
      description: language === 'fr'
        ? 'Authentification à deux facteurs et cryptage de bout en bout pour protéger vos données.'
        : 'Two-factor authentication and end-to-end encryption to protect your data.'
    },
    {
      icon: <Search size={24} className="text-red-600" />,
      title: language === 'fr' ? 'Recherche rapide' : 'Quick Search',
      description: language === 'fr'
        ? 'Trouvez rapidement vos documents et les informations dont vous avez besoin.'
        : 'Quickly find your documents and the information you need.'
    },
    {
      icon: <Bell size={24} className="text-red-600" />,
      title: language === 'fr' ? 'Notifications personnalisées' : 'Custom Notifications',
      description: language === 'fr'
        ? 'Recevez des alertes par email ou SMS pour suivre l\'avancement de votre dossier.'
        : 'Receive alerts by email or SMS to track the progress of your file.'
    },
    {
      icon: <Upload size={24} className="text-red-600" />,
      title: language === 'fr' ? 'Téléchargement facile' : 'Easy Upload',
      description: language === 'fr'
        ? 'Téléchargez vos documents directement depuis votre téléphone ou ordinateur.'
        : 'Upload your documents directly from your phone or computer.'
    },
    {
      icon: <FileText size={24} className="text-red-600" />,
      title: language === 'fr' ? 'Documents officiels' : 'Official Documents',
      description: language === 'fr'
        ? 'Accédez à tous vos documents officiels d\'immigration en un seul endroit.'
        : 'Access all your official immigration documents in one place.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {language === 'fr' 
                ? 'Une plateforme intuitive et sécurisée' 
                : 'An Intuitive and Secure Platform'}
            </h2>
            <p className="text-lg text-gray-600">
              {language === 'fr'
                ? 'Notre plateforme a été conçue pour rendre le suivi de votre dossier d\'immigration aussi simple et sécurisé que possible. Avec une interface intuitive et des fonctionnalités avancées, vous pouvez accéder à toutes les informations dont vous avez besoin en quelques clics.'
                : 'Our platform has been designed to make tracking your immigration file as simple and secure as possible. With an intuitive interface and advanced features, you can access all the information you need in just a few clicks.'}
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-red-50 p-2 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Link to="/portal">
                <Button className="bg-red-600 hover:bg-red-700">
                  {language === 'fr' ? 'Accéder à mon dossier' : 'Access my file'}
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm">
              <img 
                src="/lovable-uploads/7f62a887-7e55-4ec9-b913-cd152c1d0706.png" 
                alt={language === 'fr' ? "Plateforme sécurisée" : "Secure platform"} 
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntuitiveSecurePlatform;
